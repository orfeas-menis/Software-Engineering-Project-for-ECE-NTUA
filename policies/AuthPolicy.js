const User = require("../database/models/users")
const jwt = require('jsonwebtoken')
const credentials = require("../config/credentials");
const Joi = require('joi')
var Blacklist = require("../database/models/blacklist")
const alters = require("../config/alters")

/*
Joi Documentation: https://www.npmjs.com/package/joi
*/

module.exports = {
  login (req, res, next){
    const schema = {
      username: Joi.string().min(4).max(30).required(),
      password: Joi.string().required()
    };
    const { error } = Joi.validate(req.body, schema);
    if(error){
      switch(error.details[0].context.key){
        case 'username':
          res.status(400).json({ message: "You must provide a valid username"});
          break;
        case 'password':
          res.status(400).json({ message: "Incorrent password"});
          break;
        default:
          res.status(400).json({ message: "Incorrect Input "});
          break;
      }
    } else{
      next();
    }
  },

  isLoggedIn (req,res,next){
    var token = req.headers['x-observatory-auth']  // Express headers are auto converted to lowercase
    if (token) {
      Blacklist.findByPk(token).then(found => {
        if (found){
          res.status(403).send({message: "You are not logged in. Please Login."})
        }
        else{
          jwt.verify(token, credentials.secret, (err, decoded) => {
            if (err) {
              res.status(403).send({message:"Token is not valid. Please login!"})
            } else {
              req.decoded = decoded;
              next();
            }
          });
        }
      }) 
    } else {
      res.status(403).send("Login needed!")
    }
  },

  //isAdmin can be used as a middleware only after isLoggedIn
  isAdmin (req,res,next){
    username = req.decoded.username
    User.findOne({where: {username: username}}).then(user => {
      if (user){
        if(user.category == alters.adminUserCategory){
          next()
        }
        else{
          res.sendStatus(403)
        }
      }
      else{
        res.sendStatus(400)
      }
    })
  }
  
};
