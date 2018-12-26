const User = require("../database/models/users")

const Joi = require('joi')

/*
Joi Documentation: https://www.npmjs.com/package/joi
*/

module.exports = {
  login (req, res, next){
    const schema = {
      username: Joi.string().alphanum().min(4).max(20).required(),
      password: Joi.string().required(),
      email: Joi.string() 
      //In case we use the same path for Login and Sign Up we have to find a way to also check the sign up values here
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
    if(req.session.userId){
      next();
    } else{
      res.redirect("/");
    }
  }
};
