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
    annonces: {type: [String] },
    favoris: [],
});

const annonceSchema = new mongoose.Schema({
    utilisateur: {type: String, require: true},
    titre: {type: String, require: true },
    description: {type: String },
    image: {type: [String] },
    prix: {type: Number, require: true},
    type: {type: String, default: 'Bien' },
    categorie: {type: String }
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