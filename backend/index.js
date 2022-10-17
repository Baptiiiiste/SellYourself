const express = require("express");
const app = express();
require('./configuration/config');
const cors = require('cors');
const { User, Annonce, Note } = require("./configuration/models");

app.use(express.json());
app.use(cors());

app.post("/inscription", async (req, resp) => {
    let user = new User(req.body);
    let result = await user.save();
    resp.send(result);
})

app.listen(5000);