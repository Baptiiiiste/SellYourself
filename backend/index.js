const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require('dotenv');
dotenv.config();

const connectDB = async () => {
    mongoose.connect(process.env.DATABASE_URI, {
        autoIndex: false,
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        family: 4
    });
    const annonceSchema = new mongoose.Schema({});
    const annonces = mongoose.model("annonces", annonceSchema);
    const data = await annonces.find();
    console.warn(data);
}

connectDB();
app.listen(5000);