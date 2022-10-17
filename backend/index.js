const express = require("express");
const app = express();
require('./configuration/config');
const cors = require('cors');
const { User } = require("./configuration/models");
// var bcrypt = require('bcryptjs');
app.use(express.json());
app.use(cors());

app.post("/inscription", async (req, resp) => {
    let user = new User(req.body);
    let result = await user.save();
    resp.send(result);
})

// app.post("/connexion", async (req, resp) => {
//     User.findOne({ pseudo: req.body.pseudo }, function(err, user) {
//         if (err) throw err;
//         bcrypt.compare(req.body.password, user.password, function(err, res) {
//             if (err){
//               console.log("erreur ---------------------------- ")
//             }
//             if (res) {
//               // Send JWT
//             } else {
//               return resp.send({success: false, message: 'passwords do not match'});
//             }
//           });
//     });
// })

app.listen(5000);