const express = require("express");
const cors = require('cors');
const bcrypt = require('bcryptjs');
const { User, Annonce, Image } = require("./configuration/models");
const Jwt = require("jsonwebtoken");
const multer = require("multer");
const fs = require('fs')



// Création de l'API
const app = express();
app.use(express.json());
app.use(cors());


// Connexion à la BDD
require('./configuration/connexion');

// Requete d'inscription
app.post("/api/inscription", async (req, resp) => {
    const isPseudoAlreadyTaken = await User.findOne({pseudo: req.body.pseudo});
    const isEmailAlreadyTaken = await User.findOne({email: req.body.email});
    
    if(isPseudoAlreadyTaken) resp.send({result:"Cet identifiant est déjà pris"});
    else if(isEmailAlreadyTaken) resp.send({result:"Cette adresse e-mail est déjà prise"});
    else {
        let user = new User(req.body);
        let result = await user.save();

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
app.put("/api/utilisateur/updateUser/:id", async (req, resp) => {

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
app.post("/api/utilisateur/updatePassword/:id", async (req, resp) => {

    const userToUpdate = await User.findOne({_id: req.params.id});
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
app.post("/api/publier/:pseudo", async (req, resp) => {
    const utilisateur = req.params.pseudo;
    let annonce = new Annonce(req.body);
    let result = await annonce.save();

    await User.updateOne(
        { pseudo: req.params.pseudo },
        { $push: {annonces: annonce._id} }
    )

    await Annonce.updateOne(
        { _id: annonce._id },
        { $set: {utilisateur: utilisateur} }
    )
    resp.send(result);
});

// Requete récupération des annonces
app.get("/api/annonce", async (req, resp) => {
    const annonces = await Annonce.find();
    if (annonces.length > 0){
        resp.send(annonces);
    }
    else{
        resp.send([]);
    }
});

// Requete récupération d'une annonce
app.get("/api/annonce/:id", async (req, resp) => {
    const annonce = await Annonce.find( { _id: req.params.id } )
    if (annonce.length > 0){
        resp.send(annonce[0]);
    }
    else{
        resp.send({erreur: "Aucune annonce"});
    }
});

// Requete récupération de un utilisateur
app.get("/api/utilisateur/:pseudo", async (req, resp) => {
    const utilisateur = await User.find( { pseudo: req.params.pseudo } )
    if (utilisateur.length > 0){
        resp.send(utilisateur[0]);
    }
    else{
        resp.send({erreur: "Aucun utilisateur"});
    }
});


// Requete de suppresion d'une annonce
app.delete("/api/annonce/deleteAds/:idUser/:idAds", async (req, resp) => {

    let resAds = await Annonce.deleteOne({_id : req.params.idAds});
    let resUser = await User.updateOne(
        { _id : req.params.idUser },
        { $pull: { annonces: req.params.idAds } }
    )
    resp.send({annonce: resAds, user: resUser});

});


// Vérification du token utilisateur
function verifyToken(req, resp, next) {
    let token = req.headers['authorization'];
    if(token){

        token = token.split(" ")[1];
        Jwt.verify(token, process.env.JWTKEY,(err, success) => {
            if(err) resp.status(401).send({result: "Veuillez renseigner un token valide"});
            else next();
        });
    
    }else{
        resp.status(403).send({result: "Une erreur est survenue avec votre token d'identification, déconnectez-vous et reconnectez-vous"});
    }
}


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

// Lancement de l'API
app.listen(5000);

module.exports = app;