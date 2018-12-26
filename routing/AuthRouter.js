var express = require('express');
var router = express.Router();
var User = require('../database/models/users');
const authController = require('../controllers/AuthController');
const authControllerPolicy = require('../policies/AuthPolicy');


router.post('/',
  authControllerPolicy.login,
  authController.postLogin)


//POST route for updating data (First Time Sign up)
//router.post('/', authController.signUp)

/*
// GET route after registering
router.post('/', function (req, res, next) {
  User.findById(req.session.userId)
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          var err = new Error('Not authorized! Go back!');
          err.status = 400;
          return next(err);
        } else {
          return res.send('<h1>Name: </h1>' + user.username + '<h2>Mail: </h2>' + user.email + '<br><a type="button" href="/logout">Logout</a>')
        }
      }
    });
});
*/
// GET for logout 
router.get('/logout', function (req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});

module.exports = router;

