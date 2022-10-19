const express = require("express");
const app = express();
require('./configuration/config');
const cors = require('cors');
const { User } = require("./configuration/models");
var bcrypt = require('bcryptjs');
app.use(express.json());
app.use(cors());

app.post("/inscription", async (req, resp) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    resp.send(result);
})

app.post("/connexion", async (req, resp) => {
    if(req.body.password && req.body.pseudo){
        let user = await User.findOne({pseudo: req.body.pseudo});
        if(user){
            if(bcrypt.compareSync(req.body.password, user.password)){
                result = user.toObject();
                delete result.password;
                resp.send(result);
            }else resp.send({result:"Wrong password"})
        }else {
            resp.send({result:"No data found"})
        }
    }else {
        resp.send({result:"No data found"})
    }
})


app.listen(5000);