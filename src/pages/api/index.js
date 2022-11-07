const express = require("express");
const cors = require('cors');
const bcrypt = require('bcryptjs');
const { User, Annonce } = require("./configuration/models");
const Jwt = require("jsonwebtoken");



// Création de l'API
const app = express();
app.use(express.json());
app.use(cors());


// Connexion à la BDD
require('./configuration/connexion');

// Requete d'inscription
app.post("/api/inscription", async (req, resp) => {
    let isPseudoAlreadyTaken = await User.findOne({pseudo: req.body.pseudo});
    let isEmailAlreadyTaken = await User.findOne({email: req.body.email});
    
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
        let user = await User.findOne({pseudo: req.body.pseudo});
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
app.put("/api/utilisateur/updateUser/:pseudo", async (req, resp) => {

    let isEmailAlreadyTaken = await User.findOne({email: req.body.email});
    if(!isEmailAlreadyTaken){
        await User.updateOne(
            { pseudo: req.params.pseudo  },
            { $set: req.body }
        )
    
        const newUser = await User.findOne({pseudo : req.params.pseudo})
        resp.send({user: newUser});
    }else{
        resp.send({erreur:"Cette adresse e-mail est déjà prise"})
    }    
})





// Requete de modification du mot de passe d'un utilisateur
app.post("/api/utilisateur/updatePassword/:pseudo", async (req, resp) => {

    const userToUpdate = await User.findOne({pseudo: req.params.pseudo});
    if(bcrypt.compareSync(req.body.oldPassword, userToUpdate.password)){
        await User.updateOne(
            { pseudo: req.params.pseudo  },
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
        resp.send({erreur: "Aucune annonce"});
    }
});

// Requete récupération un utilisateur
app.get("/api/utilisateur/:pseudo", async (req, resp) => {
    const user = await User.find({pseudo: req.params.pseudo});
    if (user.length > 0){
        resp.send(user);
    }
    else{
        resp.send({erreur: "Aucun utilisateur"});
    }
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


// Lancement de l'API
app.listen(5000);

module.exports = app;