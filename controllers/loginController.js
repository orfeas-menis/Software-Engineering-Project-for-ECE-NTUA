const User = require("../database/models/users")
const bcrypt = require("bcryptjs");

//////////////////NOT WORKING!!!!!!!!!
const loginController = (req, res) => {
}

loginController.authenticate = (req,res) => {
    res.redirect('/');
}



loginController.loggedIn = (req,res) => {

   
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/')
}


/*
https://blog.risingstack.com/node-hero-node-js-authentication-passport-js/
*/

module.exports = loginController;