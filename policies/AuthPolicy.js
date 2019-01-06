const User = require("../database/models/users")
const jwt = require('jsonwebtoken')
const credentials = require("../config/credentials");
const Joi = require('joi')

/*
Joi Documentation: https://www.npmjs.com/package/joi
*/

module.exports = {
  login (req, res, next){
    const schema = {
      username: Joi.string().required(),
      password: Joi.string().required()
    };
    const { error } = Joi.validate(req.body, schema);
    if(error){
      switch(error.details[0].context.key){
        case 'username':
          res.status(400).json({ error: "You must provide a valid username"});
          break;
        case 'password':
          res.status(400).json({ error: "Incorrent password"});
          break;
        default:
          res.status(400).json({ error: "Incorrect Input "});
          break;
      }
    } else{
      next();
    }
  },

  isLoggedIn (req,res,next){
    var token = req.headers['x-observatory-auth']  // Express headers are auto converted to lowercase
    if (token) {
      jwt.verify(token, credentials.secret, (err, decoded) => {
        if (err) {
          res.status(403).send("Token is not valid")
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      res.status(403).send("Login needed!")
    }
  }
  
};
