const express = require("express");
const cors = require('cors');
const bcrypt = require('bcryptjs');
const { User, Annonce, Notification, Image } = require("./configuration/models");
const Jwt = require("jsonwebtoken");
const multer = require("multer");
const fs = require('fs')
const bodyParser = require('body-parser');
const { request } = require("http");
const { json } = require("body-parser");


//const verifyUrl = `http://www.google.com/recaptcha/api/siteverify?secret=${secretKey}`;



// Création de l'API
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Connexion à la BDD
require('./configuration/connexion');

// Requete d'inscription
app.post("/api/inscription", async (req, resp) => {
    const isPseudoAlreadyTaken = await User.findOne({pseudo: req.body.pseudo});
    const isEmailAlreadyTaken = await User.findOne({email: req.body.email});
    
    


    if(isPseudoAlreadyTaken) resp.send({result:"Cet identifiant est déjà pris"});
    
    else if(isEmailAlreadyTaken) resp.send({result:"Cette adresse e-mail est déjà prise"});

    else if(req.body.captcha === undefined || req.body.captcha === '' || req.body.captcha === null){
        return resp.json({"success": false,"msg": "Please select captcha"});
        //resp.send({result:"Captcha invalide"});
    }
    else {
        let user = new User(req.body);
        let result = await user.save();

        // Secret key for captcha 
        const secretKey = '6LeHuQ8jAAAAAMyaXJzJrY6Vk1xS47LxEe_ptwBU';

        // Verify URL for the captcha
        const verifyUrl = `http://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body.captcha}&remoteip=${req.connection.remoteAddress}`;

        // Make Request to verifyUrl

        request(verifyUrl, (err, response, body)=> {
            body = JSON.parse(body);
            console.log(body);

            // If not successful

            if(body.success !== undefined && !body.success){
                return resp.json({"success":false, "msg":"Failed captcha verification"});
                //resp.send({"result":"Captcha invalide"});
            }

            // If successful

            return resp.json({"success": true, "msg":"Captcha passed"});
            //resp.send({"success": true, "msg":"Captcha passed"});
        }); 


        result = result.toObject();
        delete result.password;



        Jwt.sign({result}, process.env.JWTKEY, {expiresIn: "2h"}, (err, token) => {
            if(err){
                resp.send({result:"Une erreur est survenue, attendez un peu"});
            }
            resp.send({user: result, authToken:token});   
        });
    }

})

// Requete de connexion
app.post("/api/connexion", async (req, resp) => {
    if(req.body.pseudo && req.body.password){
        const user = await User.findOne({pseudo: req.body.pseudo});
        if(user){
            if(bcrypt.compareSync(req.body.password, user.password)){
                let result = user.toObject();
                delete result.password;
                
                Jwt.sign({result}, process.env.JWTKEY, {expiresIn: "2h"}, (err, token) => {
                    if(err){
                        resp.send({result:"Une erreur est survenue, attendez un peu"});
                    }
                    resp.send({user: result, authToken:token});   
                });

            }else resp.send({result:"Mot de passe incorrect"});
        }else {
            resp.send({result:"Utilisateur introuvable"});
        }
    }else {
        resp.send({result:"Veuillez remplir tous les champs ci-dessous"});
    }
})

// Requete de modification des informations d'un utilisateur
app.put("/api/utilisateur/updateUser/:id", verifyToken, async (req, resp) => {

    const isEmailAlreadyTaken = await User.findOne({email: req.body.email});
    if(!isEmailAlreadyTaken){
        await User.updateOne(
            { _id: req.params.id  },
            { $set: req.body }
        )
    
        const newUser = await User.findOne({_id : req.params.id})
        resp.send({user: newUser});
    }else{
        resp.send({erreur:"Cette adresse e-mail est déjà prise"})
    }    
})


// Requete de modification du mot de passe d'un utilisateur
app.post("/api/utilisateur/updatePassword/:id", verifyToken, async (req, resp) => {

    const userToUpdate = await User.findOne({ _id: req.params.id });
    if(bcrypt.compareSync(req.body.oldPassword, userToUpdate.password)){
        await User.updateOne(
            { _id: req.params.id  },
            { $set: {password: req.body.password} }
        )
        resp.send({result: "Mot de passe changé"});
    }else{
        resp.send({erreur: "Ancien mot de passe incorrect"});
    }

});



// Requete new annonce
app.post("/api/publier/:pseudo", verifyToken ,async (req, resp) => {
    const utilisateur = req.params.pseudo;
    let annonce = new Annonce(req.body);
    await annonce.save();

    await User.updateOne(
        { pseudo: req.params.pseudo },
        { $push: {annonces: annonce._id} }
    )

    await Annonce.updateOne(
        { _id: annonce._id },
        { $set: {utilisateur: utilisateur} }
    )

    const newUser = await User.findOne({ pseudo: req.params.pseudo })
    resp.send({user : newUser});
});

// Requete récupération des annonces
app.get("/api/annonces", async (req, resp) => {
    const annonces = await Annonce.find();

    let tableau = [];
    if (annonces.length > 0){
        for(const a of annonces){
            const utilisateur = await User.find( { pseudo: a.utilisateur } );
            tableau.push([a, utilisateur[0]]);
        }
    }

    resp.send([tableau, annonces.length]);
});

// Requete récupération d'une annonce
app.get("/api/annonce/:id", verifyToken, async (req, resp) => {
    const annonce = await Annonce.find( { _id: req.params.id } )
    if (annonce.length > 0){
        resp.send(annonce[0]);
    }
    else{
        resp.send({erreur: "Aucune annonce"});
    }
});

// Requete recherche annonces
app.get("/api/annonce/search/:categorie/:rechercher", verifyToken, async (req, resp) => {
    let annonces;
    let tableau = [];
    let lesAnnonces = [];
    if(req.params.categorie === 'Toutes' && req.params.rechercher === 'Toutes'){
        annonces = await Annonce.find();
    }
    else if(req.params.categorie === 'Toutes'){
        
        annonces = await Annonce.find({$or: [
            {description: {$regex: req.params.rechercher}}, 
            {titre: {$regex: req.params.rechercher}}
        ]});
    }
    else if(req.params.rechercher === 'Toutes'){
        annonces = await Annonce.find( { categorie: req.params.categorie } );
    }
    else{
        annonces = await Annonce.find({$or: [
            {description: {$regex: req.params.rechercher}}, 
            {titre: {$regex: req.params.rechercher}}
        ]});

        if (annonces.length > 0){
            for(const a of annonces){
                if(a.categorie === req.params.categorie){
                    lesAnnonces.push(a);
                }
            }
            annonces = lesAnnonces;
        }
    }
    if (annonces.length > 0){
        for(const a of annonces){
            const utilisateur = await User.find( { pseudo: a.utilisateur } );
            tableau.push([a, utilisateur[0]]);
        }
    }

    resp.send([tableau, annonces.length]);
});

// Requete récupération de un utilisateur
app.get("/api/utilisateur/:pseudo", verifyToken, async (req, resp) => {
    const utilisateur = await User.find( { pseudo: req.params.pseudo } )
    if (utilisateur.length > 0){
        let nbNote = utilisateur[0].noteList.length;
        let note;
        if(nbNote === 0){
            note = "Aucune note"
        }
        else{
            let moy = 0;
            for( const n of utilisateur[0].noteList){
                moy += parseInt(n.note);
            }
            moy = Number((moy/nbNote).toFixed(2));
            note = moy + "/5";
        }
        resp.send([utilisateur[0], note, nbNote]);
    }
    else{
        resp.send({erreur: "Aucun utilisateur"});
    }
});

// Requete de suppression d'une annonce
app.delete("/api/annonce/delete/:idUser/:idAds", verifyToken, async (req, resp) => {

    let resAds = await Annonce.deleteOne( { _id : req.params.idAds } );
    let resUser = await User.updateOne(
        { _id : req.params.idUser },
        { $pull: { annonces: req.params.idAds } }
    )
    if(resAds && resUser){
        const newUser = await User.findOne({ _id : req.params.idUser });
        resp.send({user: newUser});
    }
    else{
        resp.send({erreur: "Erreur lors de la suppression"})
    } 

});

// Requete d'ajout d'une annonce en favoris
// !!! Faut tester !!!
app.post("/api/favoris/addFavs/:idUser/:idAnnonce", verifyToken, async (req, resp) => {
    let user = await User.findOne({_id : req.params.idUser});
    let actualFavs = user.favoris;
    if (actualFavs.find(req.params.idAnnonce) == undefined) {
        await User.updateOne(
            { _id: req.params.idUser },
            { $push: {annonces: req.params.idAnnonce} }
        )
    }
})


// app.get("/api/search/:key", verifyToken, async(req,resp) => {
//     let result = await Annonce.find({
//         "$or": [
//             {
//                 name: { $regex: req.params.key}
//             },

//         ]
//     });
//     resp.send(result);
// })


app.get("/api/utilisateur/addNotif/:pseudo", async(req,resp) => {
    if(!req.body.type || !req.body.content) {return resp.send({erreur: "Veuillez renseigner un message pour votre notification"})}
    const notif = new Notification({type: req.body.type, content: req.body.content});
    let result = await User.updateOne(
        {pseudo : req.params.pseudo},
        { $push: 
            {notifications: 
                notif
            } 
        }
    );

    if(result){
        const user = await User.findOne({pseudo: req.params.pseudo});
        if(!user) return resp.send({erreur: "Utilisateur introuvable"});
        resp.send({user: user});
    }else{
        resp.send({erreur: "Erreur lors de l'envoie de la notification"});
    }

})

// app.delete("/api/annonce/delete/:idUser/:idAds", verifyToken, async (req, resp) => {

//     let resAds = await Annonce.deleteOne( { _id : req.params.idAds } );
//     let resUser = await User.updateOne(
//         { _id : req.params.idUser },
//         { $pull: { annonces: req.params.idAds } }
//     )
//     if(resAds && resUser){
//         const newUser = await User.findOne({ _id : req.params.idUser });
//         resp.send({user: newUser});
//     }
//     else{
//         resp.send({erreur: "Erreur lors de la suppression"})
//     } 

// });




// Image

const Storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads')
    },

    filename: (req, file, cb)=>{
        cb(null,file.originalname)
    }
})

const upload = multer({
    storage: Storage
})//.single('testImage')

app.post('/',upload.single('testImage'),(req,res)=>{
    
    const saveImage = new Image({
        nom: req.body.name,
        image:{
            data: fs.readFileSync('uploads/' + req.file.filename),
            contentType:"image/png"
        },
    });

    saveImage.save()
    .then((res)=>{console.log('image is saved')})
    .catch((err)=>{console.log(err, 'error has occurr')})
    /*
    upload(req,res,err=>{
        if(err){
            console.log
        }
        else{
            const newImage = new Image({
                name: req.body.name,
                image: {
                    data: req.file.filename,
                    contentType: 'image/png'
                }
            })

            newImage.save()
            .then(()=>res.send('successfully uploaded'))
            .catch(err=>console.log(err))

        }
    })
    */
})





app.get('/',async(req,res)=>{
    const allData = await Image.find()
    res.json(allData)
})


// ----------------------

// Captcha

// ----------------------



// app.get('/api/captcha', (req,res) => {
//     res.sendFile(__dirname + '/index.html');
// });


// ---------------------------------------------------------------------------------------

// Vérification du token utilisateur
function verifyToken(req, resp, next) {
    let token = req.headers['authorization'];
    if(token){

        token = token.split(" ")[1];
        Jwt.verify(token, process.env.JWTKEY,(err, success) => {
            if(err) resp.status(401).send({tokenError: "Une erreur est survenue avec votre token d'identification, déconnectez-vous et reconnectez-vous"});
            else next();
        });
    
    }else{
        resp.status(403).send({tokenError: "Une erreur est survenue avec votre token d'identification, déconnectez-vous et reconnectez-vous"});
    }
}

// ----------------------------------------------------------

app.get("/api/search/:key", async(req,resp) => {
    let result = await Annonce.find({
        "$or": [
            {
                name: { $regex: req.params.key}
            },

        ]
    });
    resp.send(result);
})

// Lancement de l'API
app.listen(5000);

module.exports = app;