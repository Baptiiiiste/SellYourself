const express = require("express");
const cors = require('cors');
const bcrypt = require('bcryptjs');
const { User, Annonce, Notification, Image } = require("./configuration/models");
const Jwt = require("jsonwebtoken");
const multer = require("multer");
const fs = require('fs');
let ObjectId = require('mongodb').ObjectId;
const request2 = require('request');


//const verifyUrl = `http://www.google.com/recaptcha/api/siteverify?secret=${secretKey}`;




// Création de l'API
const app = express();
app.use(express.json({limit: '25mb'}));
app.use(cors());
app.use(express.urlencoded({limit: '25mb', extended: false}));

// Connexion à la BDD
require('./configuration/connexion');

// Requete d'inscription
app.post("/api/inscription", async (req, resp) => {
    const isPseudoAlreadyTaken = await User.findOne({pseudo: req.body.pseudo});
    const isEmailAlreadyTaken = await User.findOne({email: req.body.email});
    
    if(isPseudoAlreadyTaken) resp.send({result:"Cet identifiant est déjà pris"});
    
    else if(isEmailAlreadyTaken) resp.send({result:"Cette adresse e-mail est déjà prise"});

    else if(req.body.captcha === undefined || req.body.captcha === '' || req.body.captcha === null){
        if(resp.headersSent !== true){
            resp.send({"success": false,"result": "Veuillez vérifier la captcha"});
        }
        //resp.send({result:"Captcha invalide"});
    }
    else {
        let user = new User(req.body);
        let result = await user.save();

        // Secret key for captcha 
        const secretKey = '6LeHuQ8jAAAAAMyaXJzJrY6Vk1xS47LxEe_ptwBU';

        // Verify URL for the captcha
        const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body.captcha}&remoteip=${req.connection.remoteAddress}`;
        
        // Make Request to verifyUrl

        request2(verifyUrl, (err, response, body)=> {
            body = JSON.parse(body);
            // console.log(body);

            // If not successful

            if(body.success !== undefined && body.success === false){
                if(resp.headersSent !== true){
                    resp.send({"success":false, "result":"Échec de la vérification de la captcha"});
                }
                //resp.send({"result":"Captcha invalide"});
            }

            // If successful
            if(resp.headersSent !== true){
                resp.send({"success": true, "result":"Captcha réussie"});
            }
            //resp.send({"success": true, "msg":"Captcha passed"});
        }); 


        result = result.toObject();
        delete result.password;



        Jwt.sign({result}, process.env.JWTKEY, {expiresIn: "2h"}, (err, token) => {
            if(err){
                if(resp.headersSent !== true){
                    resp.send({result:"Une erreur est survenue, attendez un peu"});
                }
                
            }
            if(resp.headersSent !== true){
                resp.send({user: result, authToken:token});
            }
               
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
                delete result.profilPic;
                let utilisateur = user.toObject();
                delete utilisateur.password;
                
                Jwt.sign({result}, process.env.JWTKEY, {expiresIn: "2h"}, (err, token) => {
                    if(err){
                        resp.send({result:"Une erreur est survenue, attendez un peu"});
                    }
                    resp.send({user: utilisateur, authToken:token});   
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
app.get("/api/annonce/search/:categorie/:rechercher", async (req, resp) => {
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
app.post("/api/favoris/add/:idUser/:idAnnonce", verifyToken, async (req, resp) => {
    let user = await User.findOne({_id : req.params.idUser});
    if(!user.favoris.includes(req.params.idAnnonce)){
        let result= await User.updateOne(
            { _id: req.params.idUser },
            { $push: {favoris: req.params.idAnnonce} }
        )
        if(result){
            let user = await User.findOne({_id : req.params.idUser});
            resp.send({user: user})
        }else{
            resp.send({erreur: "erreur"})
        }
    }else{
        resp.send({erreur: "erreur"})
    }
})

// Requete de suppression d'une annonce en favoris
app.delete("/api/favoris/delete/:idUser/:idAnnonce", verifyToken, async (req, resp) => {
    let resUser = await User.updateOne(
        { _id : req.params.idUser },
        { $pull: { favoris: req.params.idAnnonce } }
    )
    if(resUser){
        const newUser = await User.findOne({ _id : req.params.idUser });
        resp.send({user: newUser});
    }
    else{
        resp.send({erreur: "Erreur lors de la suppression"})
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

app.get("/api/utilisateur/getNotif/:pseudo", async (req, resp) => {
    let listNotifs = [];
    const user = await User.findOne({pseudo: req.params.pseudo});
    for (let i = 0; i < user.notifications.length; i++) {
        let notif = await Notification.findOne({ _id : new ObjectId(user.notifications[i]) });
        listNotifs.push(notif);
    }
    resp.send({listNotifs});
});

// Requete de suppression favoris inexistant
app.post("/api/viderFav/:user", async (req, resp) => {
    const user = await User.findOne({ pseudo : req.params.user });
    if(user.favoris.length === 0){
        resp.send({user: user});
    } else {
        user.favoris.forEach(async element => {
            const result = await Annonce.findOne({_id : element});
            if(!result){
                resUser = await User.updateOne(
                    { pseudo : req.params.user },
                    { $pull : { favoris : element } }
                )
            }
        });
        const newUser = await User.findOne({ pseudo : req.params.user });
        if(newUser){
            resp.send({user: newUser});
        }
    }
})

// Requete de ajout d'une notification
app.get("/api/utilisateur/addNotif/:pseudo", async(req,resp) => {
    if(!req.body.type || !req.body.content) {return resp.send({erreur: "Veuillez renseigner un message pour votre notification"})}
    const notif = new Notification({type: req.body.type, content: req.body.content});
    await notif.save();
    let notifId = (notif._id).toString();
    let result = await User.updateOne(
        {pseudo: req.params.pseudo},
        { $push: {notifications: notifId} }
    );

    if(result){
        const user = await User.findOne({pseudo: req.params.pseudo});
        if(!user) return resp.send({erreur: "Utilisateur introuvable"});
        resp.send({user: user});
    }else{
        resp.send({erreur: "Erreur lors de l'envoie de la notification"});
    }
})

// Requete modification image profil utilisateur
app.put("/api/utilisateur/image/:pseudo", verifyToken, async (req, resp) => {
    let result= await User.updateOne(
        { pseudo: req.params.pseudo },
        { $set: req.body }
    )
    if(result){
        let user = await User.findOne({pseudo : req.params.pseudo});
        resp.send({user: user})
    }else{
        resp.send({erreur: "erreur"})
    }
})

// Requete modification annonce
app.put("/api/annonce/edit/:annonce/:user", verifyToken, async (req, resp) => {
    let annonce = await Annonce.findOne({ _id: req.params.annonce });
    if(annonce){
        if(annonce.utilisateur === req.params.user){
            let result = await Annonce.updateOne(
                { _id: req.params.annonce },
                { $set: req.body }
            )
            if(result){
                let newAnnonce = await Annonce.findOne({ _id: req.params.annonce });
                resp.send({annonce: newAnnonce});
            } else {
                resp.send({msg: "non"});
            }
        } else {
            resp.send({erreur: "l'annonce de vous appartient pas"});
        }
    }else{
        resp.send({erreur: "erreur"});
    }
})

app.delete("/api/utilisateur/deleteNotif/:pseudo/:idNotif", async (req, resp) => {
    
    //let resNotif = await Notification.deleteOne( { _id : req.params.idNotif  });
    await User.updateOne(
        { pseudo : req.params.pseudo },
        { $pull: { notifications: req.params.idNotif } }
    );
    
    const newUser = await User.findOne({ pseudo : req.params.pseudo });
    if(newUser){
        resp.send({user: newUser});
    }else{
        resp.send({erreur: "Erreur lors de la suppression", resUser: resUser, resNotif: resNotif});
    }
});


// Requete recupération nombre annonce utilisateur
app.get("/api/annonce/user/:pseudo", verifyToken, async (req, resp) => {
    const user = await User.find( { pseudo: req.params.pseudo } );
    resp.send({annonces: user[0].annonces});
});

// ----------------------

// Captcha

// ----------------------



// app.get('/api/captcha', (req,res) => {
//     res.sendFile(__dirname + '/index.html');
// });


// ---------------------------------------------------------------------------------------


app.delete("/api/utilisateur/deleteAllNotif/:pseudo", async (req, resp) => {
    let user = await User.findOne({ pseudo: req.params.pseudo })
    user.notifications.splice(0, user.notifications.length)
    await User.updateOne(
        {pseudo: req.params.pseudo},
        {$set: {notifications: user.notifications}}
    );
    
    const newUser = await User.findOne({ pseudo : req.params.pseudo });
    if(newUser){
        resp.send({user: newUser});
    }else{
        resp.send({erreur: "Erreur lors de la suppression"})
    }

});




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


// Lancement de l'API
app.listen(5000);

module.exports = app;