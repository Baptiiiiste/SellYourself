const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    pseudo: {type: String, required: true, index: { unique: true }},
    email: {type: String, required: true, index: { unique: true }},
    password: {type: String, required: true},
    prenom: {type: String, default: ""},
    description: {type: String, default: ""},
    nom: {type: String, default: ""},
    ville: {type: String, default: ""},
    profilPic: {type: String, default: ""},
    paypal: {type: String, default: ""},
    note: {Type: Number},
    noteList: [],
    notifications: [],
    annonces: [],
    favoris: [],
});

const annonceSchema = new mongoose.Schema({
    idAnnonce: {type: Number, required: true, index: { unique: true }},
    utilisateurId: {type: String, required: true},
    titre: {type: String, required: true},
    description: {type: String, required: true},
    image: {type: [String], required: true},
    prix: {type: Number, default: 0},
    type: {type: String, require: true},
    categorie: {type: String, require: true}
});

const noteSchema = new mongoose.Schema({
    utilisateurId: {type: String, required: true},
    note: {type: Number, required: true},
});

const notificationSchema = new mongoose.Schema({
    type: {type: String, required: true},
    content: {type: String, required: true}
});

module.exports = {
    User: mongoose.model("users", userSchema),
    Annonce: mongoose.model("annonces", annonceSchema),
    Note: mongoose.model("notes", noteSchema),
    Notification: mongoose.model("notifications", notificationSchema)
}