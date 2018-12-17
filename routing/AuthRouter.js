var express = require('express');
var router = express.Router();
var User = require('../models/user');
const authController = require('../controllers/AuthController');





//POST route for updating data (First Time Sign up)
router.post('/', authController.signUp)

// GET route after registering
router.get('/profile', function (req, res, next) {
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

// GET for logout logout
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


/*
https://medium.com/createdd-notes/starting-with-authentication-a-tutorial-with-node-js-and-mongodb-25d524ca0359?fbclid=IwAR1pmVysWhw5vtidPEuMQj5efIO4D3nRMSNcaATX-79SeiIXxD2ICexsWxQ
->
https://github.com/Createdd/authenticationIntro/blob/master/routes/router.js
*/
