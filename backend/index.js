const express = require("express");
const app = express();
require('./db/config');
const User = require("./models/User");

app.use(express.json());

app.post("/inscription", async (req, resp) => {
    let user = new User(req.body);
    let result = await user.save();
    resp.send(result);
})

app.listen(5000);