const express = require("express");
const cors = require('cors');
let corsOptions = {
    origin: 'https://sellyourself.fr/' // Compliant
};
const bcrypt = require('bcryptjs');
const { User, Annonce, Notification, Note, Achat, Conversation, Message } = require("./configuration/models");
const Jwt = require("jsonwebtoken");
let ObjectId = require('mongodb').ObjectId;
const request2 = require('request');


//const verifyUrl = `http://www.google.com/recaptcha/api/siteverify?secret=${secretKey}`;

const nodemailer = require('nodemailer');

// Création de l'API
const app = express();
app.use(express.json({limit: '25mb'}));
app.use(cors(corsOptions));
app.use(express.urlencoded({limit: '25mb', extended: false}));
app.set("view engine","ejs");

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
    }
    else {
        let user = new User(req.body);
        let result = await user.save();

        // Secret key for captcha 
        const secretKey = process.env.SECRET_KEY;

        // Verify URL for the captcha
        const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body.captcha}&remoteip=${req.connection.remoteAddress}`;
        
        // Make Request to verifyUrl

        request2(verifyUrl, (err, response, body)=> {
            body = JSON.parse(body);

            // If not successful

            if(body.success !== undefined && body.success === false){
                if(resp.headersSent !== true){
                    resp.send({"success":false, "result":"Échec de la vérification de la captcha"});
                }
            }

            // If successful
            if(resp.headersSent !== true){
                resp.send({"success": true, "result":"Captcha réussie"});
            }
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

        let transporter = nodemailer.createTransport({
            secure: true,
            requireTLS: true,
            secured: true,
            service: 'gmail',
            auth: {
            user: 'sellyourselfteam@gmail.com',
            pass: process.env.MDP
            }
        });
        

        let mailOptions = {
            from: 'sellyourselfteam@gmail.com',
            to: req.body.email,
            subject: 'Bienvenue ' + req.body.pseudo + ' !',
            text: 'Bonjour et bienvenue ' + req.body.pseudo + ' sur notre site web SellYourself ! \n\nMerci de la confiance que vous nous accordez, en espérant passer de bons moments à vos côtés.\n\nVous pourrez utiliser cette adresse email pour récupérer votre mot de passe si jamais vous l\'avez oublié.\n\nL\'équipe SellYourself',
        };
        
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
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
app.post("/api/publier", verifyToken ,async (req, resp) => {
    const utilisateur = req.body.vendeur;
    let annonce = new Annonce({utilisateur: req.body.vendeur, titre: req.body.titre, description: req.body.description, image: req.body.image, prix: req.body.prix, type: req.body.type, categorie: req.body.categorie});
    await annonce.save();

    await User.updateOne(
        { pseudo: req.body.vendeur },
        { $push: {annonces: annonce._id} }
    )

    await Annonce.updateOne(
        { _id: annonce._id },
        { $set: {utilisateur: utilisateur} }
    )

    const newUser = await User.findOne({ pseudo: req.body.vendeur })
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
                await User.updateOne(
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

// Requete d'ajout d'une notification
app.post("/api/utilisateur/addNotif",verifyToken, async(req,resp) => {
    if(!req.body.type || !req.body.content) {return resp.send({erreur: "Veuillez renseigner un message pour votre notification"})}
    const notif = new Notification({type: req.body.type, content: req.body.content});
    await notif.save();
    let notifId = (notif._id).toString();
    let result = await User.updateOne(
        {pseudo: req.body.destinataire},
        { $push: {notifications: notifId} }
    );

    if(result){
        const user = await User.findOne({pseudo: req.body.destinataire});
        if(!user) return resp.send({erreur: "Utilisateur introuvable"});
        resp.send({user: user});
    }else{
        resp.send({erreur: "Erreur lors de l'envoie de la notification"});
    }
})

app.delete("/api/utilisateur/deleteNotif/:pseudo/:idNotif", async (req, resp) => {
    
    let resNotif = await Notification.deleteOne( { _id : req.params.idNotif  });
    await User.updateOne(
        { pseudo : req.params.pseudo },
        { $pull: { notifications: req.params.idNotif } }
    );
    
    const newUser = await User.findOne({ pseudo : req.params.pseudo });
    if(newUser){
        resp.send({user: newUser});
    }else{
        resp.send({erreur: "Erreur lors de la suppression", resNotif: resNotif});
    }
});

app.delete("/api/utilisateur/deleteAllNotif/:pseudo", async (req, resp) => {
    let user = await User.findOne({ pseudo: req.params.pseudo })
    user.notifications.forEach(async element => {
        await Notification.deleteOne( { _id : element  });
    })
    user.notifications.splice(0, user.notifications.length);
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

// Requete recupération nombre annonce utilisateur
app.post("/api/annonce/user", verifyToken, async (req, resp) => {
    const user = await User.findOne( { pseudo: req.body.pseudo } );
    resp.send({annonces: user.annonces});
});

// Requete ajout d'une note
app.post("/api/note/:annonce/:vendeur/:user/:note", verifyToken, async (req, resp) => {
    const user = await User.findOne( { pseudo: req.params.user } );
    const note = new Note({utilisateurId: user._id, annonceId: req.params.annonce, note: req.params.note});

    const userUpdate = await User.updateOne( 
        { pseudo: req.params.vendeur },
        { $push: { noteList: note} }
    );
    if(userUpdate){
        const result = await User.findOne({ pseudo: req.params.vendeur })
        resp.send({ user: result });
    } else {
        resp.send({ erreur: "erreur" });
    }
})

// Requete récupération si un vendeur pour une annonce est notée
app.get("/api/isNoted/:annonce/:vendeur/:user", verifyToken, async (req, resp) => {
    const vendeur = await User.findOne( { pseudo: req.params.vendeur } );
    let bool = false;
    let note = 0;
    if(vendeur){
        const user = await User.findOne( { pseudo: req.params.user } );
        if(user){
            vendeur.noteList.forEach(element => {
                if(element.utilisateurId === user._id && element.annonceId === req.params.annonce){
                    bool = true;
                    note = element.note;
                }
            });
        }
    }
    if(bool){
        resp.send({isNoted: true, note: note});
    } else {
        resp.send({isNoted: false});
    }
    
});

// Requete delete note /:annonce/:vendeur/:user
app.post("/api/note/delete", verifyToken, async (req, resp) => {
    const vendeur = await User.findOne( { pseudo: req.body.vendeur } );
    if(vendeur){
        vendeur.noteList.forEach(async element => {
            if(element.utilisateurId === req.body.user && element.annonceId === req.body.annonce){
                const resUser = await User.updateOne(
                    { pseudo : req.body.vendeur },
                    { $pull : { noteList : element } }
                )
                resp.send({user: resUser});
            }
        });
    } else {
        resp.send({erreur: "erreur"});
    }
});

// Requete achat 
app.post("/api/achat", verifyToken, async (req, resp) => {
    const annonce = await Annonce.findOne( {_id: req.body.annonce } );
    if(!annonce.vendu){
        const achat = new Achat(req.body);
        await achat.save();
        let result = await Annonce.updateOne(
            { _id: annonce._id },
            { $set: { vendu: true} }
        )
        resp.send({achat: result});
    } else {
        resp.send({error: "annonce deja vendu"});
    }
});

// Requete récuperation achat
app.post("/api/getAchat", verifyToken, async (req, resp) => {
    const achat = await Achat.findOne({ annonce: req.body.annonce });
    resp.send({ achat: achat });
});



// ---------------------------------------------------------------------------------------
// CHAT

app.get("/api/accessChat/:annonce/:vendeur/:acheteur", verifyToken, async (req, resp) => {
    const annonce = req.params.annonce; //id
    const vendeur = req.params.vendeur; //pseudo
    const acheteur = req.params.acheteur; //pseudo
    
    const isAlredyExisting = await Conversation.findOne({annonce: annonce, vendeur: vendeur, acheteur: acheteur});
    if(isAlredyExisting) return resp.send({success: `/chat/${annonce}/${vendeur}/${acheteur}`});

    let conv = new Conversation({vendeur, acheteur, annonce});
    let result = await conv.save();

    //acheteur
    await User.updateOne(
        { pseudo : acheteur },
        { $push: { conversations: (conv._id).toString() } }
    )

    //vendeur
    await User.updateOne(
        { pseudo : vendeur },
        { $push: { conversations: (conv._id).toString() } }
    )

    const user = await User.findOne({pseudo : acheteur});


    if(result) return resp.send({success: `/chat/${annonce}/${vendeur}/${acheteur}`, user: user});
    return resp.send({erreur: "Une erreur est survenue"});
});

app.get("/api/getChat/:annonce/:vendeur/:acheteur", verifyToken, async (req, resp) => {
    const annonce = req.params.annonce; //id
    const vendeur = req.params.vendeur; //pseudo
    const acheteur = req.params.acheteur; //pseudo
    
    const isAlredyExisting = await Conversation.findOne({annonce: annonce, vendeur: vendeur, acheteur: acheteur});
    if(isAlredyExisting) return resp.send({success: isAlredyExisting.messages});
    return resp.send({erreur: "Une erreur est survenue"});
});

app.post("/api/addMessageChat", async (req, resp) => {
    const annonce = req.body.annonce; //id
    const vendeur = req.body.vendeur; //pseudo
    const acheteur = req.body.acheteur; //pseudo
    const author = req.body.author; //pseudo
    const content = req.body.content; //text
    
    const isAlredyExisting = await Conversation.findOne({annonce: annonce, vendeur: vendeur, acheteur: acheteur});
    if(isAlredyExisting){
        let newMsg = new Message({author, content});
        await newMsg.save();

        let result = await Conversation.updateOne(
            { _id : (isAlredyExisting._id).toString() }, 
            { $push : { messages: newMsg } }
        );
        return resp.send({success:  result });
    }
    resp.send({erreur: "Erreur !"})
});

app.get("/api/chat/:id/:pseudoUser", verifyToken, async (req, resp) => {
    const conv = await Conversation.find( { _id: req.params.id } )
    if (conv.length) {

        let user;
        if(req.params.pseudoUser === conv[0].acheteur){
            user = await User.findOne( { pseudo: conv[0].vendeur } );
        }else{
            user = await User.findOne( { pseudo: conv[0].acheteur } );
        }
        const annonces = await Annonce.findOne( { _id: conv[0].annonce} );

        resp.send({
            conv: conv[0],
            idConv: conv[0]._id,
            otherPseudo: user.pseudo,
            otherPhoto: user.profilPic,
            idAnnonce: conv[0].annonce,
            nomAnnonce: annonces.titre,
            acheteur: conv[0].acheteur,
            vendeur: conv[0].vendeur,
        });
    }
    else{
        resp.send({erreur: "Aucune conversation"});
    }
});

// SOCKET.IO
const morgan = require("morgan");
const http = require("http").createServer(app);
app.use(morgan("dev"));
const io = require("socket.io")(http, {
    path: "/socket.io",
    cors: {
        origin: ["https://sellyourself.fr/"],
        methods: ["GET", "POST"],
        allowedHeaders: ["content-type"],
    },
});

const chat = (io) => {
    // console.log("live chat ---> ", io.opts);
    io.on("connection", (socket) => {
      // console.log("socket id", socket.id);
      socket.on("username", (username) => {
        console.log("username", username);
        // you can emit this user to all connected clients
        io.emit("user joined", `${username} joined`);
      });
      // disconnect
      socket.on("disconnect", () => {
        console.log("user disconnected");
      });

    socket.on("message", (data) => {
        io.emit("message", data);
    });

    });
};

io.use((socket, next) => {
    // console.log("connected to SOCKET", socket.handshake); // headers, query, auth etc
    const username = socket.handshake.auth.username; 
    if (!username) {
      return next(new Error("invalid username"));
    }
    socket.username = username;
    console.log('socket.username in middleware', socket.username)
    next();
});


chat(io);

http.listen(5050)



// ----------------------

// Forgot password

// ----------------------

app.post("/api/forgotPwd",async(req,resp)=>{
    try{

        const oldUser = await User.findOne({email: req.body.email});

        if( !oldUser){
            resp.send({result:"Adresse e-mail inconnue"});
        }

        const secret = process.env.JWTKEY + oldUser.password;
        const token = Jwt.sign({email : oldUser.email, pseudo : oldUser.pseudo}, secret, {expiresIn:'5m'});
        const link = `https://sellyourself.fr/resetPassword/${oldUser.pseudo}/${token}`;

        let transporter = nodemailer.createTransport({
            secure: true,
            requireTLS: true,
            secured: true,
            service: 'gmail',
            auth: {
            user: 'sellyourselfteam@gmail.com',
            pass: 'obyhohtdoggzdpwl'
            }
        });
        

        let mailOptions = {
            from: 'sellyourselfteam@gmail.com',
            to: req.body.email,
            subject: 'Réinitialiser votre mot de passe',
            text: 'Bonjour, vous avez fait une requête pour réinitialiser votre mot de passe \n\nVeuillez suivre le lien suivant: \n' + link,
        };
        
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
            console.log(error);
            }
        });

            resp.send({});
            }
            catch(error){
                
            }
        });

app.post('/api/resetPassword', async(req, resp)=>{
    const pseudo = req.body.pseudo;
    const token = req.body.token;
    const passwordGet = req.body.hashPassword;
    const newUser = await User.findOne({pseudo: pseudo});

    if( !newUser){
        resp.send({result:"Lien invalide, veuillez réessayer"});
        return;
    }

    const secret = process.env.JWTKEY + newUser.password;

    try{
        Jwt.verify(token,secret);
        await User.updateOne(
            { pseudo: pseudo  },
            { $set: {password: passwordGet} }
        )
        resp.send({result:"Mot de passe modifié avec succès !"});
        
    } catch(err) {
        resp.send({result:"Session expiré, veuillez recommencer"});
    }
});





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

module.exports = {app};