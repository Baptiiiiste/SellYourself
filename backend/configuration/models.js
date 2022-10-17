const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    pseudo: {type: String, required: true, index: { unique: true }},
    email: {type: String, required: true, index: { unique: true }},
    password: {type: String, required: true},
    prenom: {type: String, default: ""},
    nom: {type: String, default: ""},
    // image: {type: String},
    paypal: {type: String, default: ""},
    note: {Type: Number},
    noteList: {Type: Array, default: [] },
    notifications: {Type: Array, default: [] },
    annonces: {Type: Array, default: [] },
    favoris: {Type: Array, default: [] },
});

const annonceSchema = new mongoose.Schema({
    utilisateur: userSchema,
    titre: {type: String, required: true},
    description: {type: String, required: true},
    Image: {type: [String], required: true},
    prix: {type: Number, default: 0}
});

const noteSchema = new mongoose.Schema({
    utilisateur: userSchema,
    note: {type: Number, required: true},
});



module.exports = {
    User: mongoose.model("users", userSchema),
    Annonce: mongoose.model("annonces", annonceSchema),
    Note: mongoose.model("notes", noteSchema)
}