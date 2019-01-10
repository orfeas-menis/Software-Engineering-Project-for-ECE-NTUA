var User = require("../database/models/users")
var Product = require("../database/models/products")
var Shop = require("../database/models/shops")
var Price = require("../database/models/prices")
const jwt = require('jsonwebtoken')
const credentials = require("../config/credentials");
const bcrypt = require("bcryptjs");
var Blacklist = require("../database/models/blacklist")
const Sequelize = require("sequelize");
const Op = Sequelize.Op

const ApiAuthController = (req, res) => {
}

ApiAuthController.login = (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    User.findOne({where: {username: username}}).then(user => {
        if (!user){
            res.status(404).send("User with username: \"" + username + "\" does not exist.")
        }
        else{
            bcrypt.compare(password, user.password).then(isMatch => {
                if (isMatch){
                    var token = jwt.sign({username: username},
                        credentials.secret,
                        { expiresIn: '1 h'} // expires in 1 hour
                    );
                    var now = new Date()
                    user.update({"lastLogin" : now},{fileds:["lastLogin"]})
                    // return the JWT token for the future API calls
                    res.status(200).send(token)
                }
                else{
                    res.status(400).send("Wrong Password!")
                }
            })
        }
    })    
}

ApiAuthController.logout = (req, res) => {
    var token = req.headers['x-observatory-auth']
    if(token){
        var exp = req.decoded.exp
        Blacklist.findAll(
            {where: { 
                exp : {
                    [Op.lt]: parseInt(Date.now() / 1000) 
                } 
            }}).then(found =>{
            found.forEach(function myFunction(value,index,array){
                value.destroy({force:true})
            })
        })
        Blacklist.create({
            token: token,
            exp : exp
        })
        res.status(200).json({"message": "OK"})
    }
    
}

module.exports = ApiAuthController;
