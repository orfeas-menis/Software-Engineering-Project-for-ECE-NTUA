var User = require("../database/models/users")
const bcrypt = require("bcryptjs");


const AuthController = (req, res) => {
}

AuthController.signUp = (req, res) => {

// confirm that user typed same password twice

    bcrypt.compare(req.body.password, req.body.passwordConf, (err, result) => {
        if (err) throw err;
        if (result === false) {
            req.session.userId = null;
            var err = new Error('Passwords do not match.');
            err.status = 400;
            res.send("passwords dont match");
            return next(err);
//redirect or reurn next(err) ???? 
            res.redirect('/')
        } 
        else {
            console.log(req.session);
            if (req.body.email &&
                req.body.username &&
                req.body.password &&
                req.body.passwordConf) 
            {
        

                bcrypt.hash(req.body.password , 10, (err, hash) => {
                    if (err) return err;
                        return User.create({
                            email: req.body.email,
                            username: req.body.username,
                            password: req.body.password,
                            category: credentials.simple_user.category
                        });
                
                
                });
            }
        }
    });


// They just check if the post request has logemail and logpass or the other values so as to distinguish login with sign up
/*
    } else if (req.body.logemail && req.body.logpassword) {
        User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
        if (error || !user) {
            var err = new Error('Wrong email or password.');
            err.status = 401;
            return next(err);
        } else {
            req.session.userId = user._id;
            return res.redirect('/profile');
        }
        });
    } else {
        var err = new Error('All fields required.');
        err.status = 400;
        return next(err);
    }
*/
}


AuthController.postLogin = (req, res) => {
    if (req.body.passwordConf){
        /*this is a way to use the same path for login and sign up and distinguish the difference by the    
        "variables" in the post request body. If it is Login there will only be username (or email, we will see)
        and passord, if it is Sign up there will be additionally email (or username in the other ase), 
        password Confirmation, and any other info asked during the Sign up process*/ 
        console.log("It is Sign Up, not Login")
    }
    else{
        
        User.findOne({ where: { username: req.body.username } }).then(foundUser => {
        if (foundUser) {
            console.log(foundUser);
            bcrypt.compare(req.body.password, foundUser.password, (err, result) => {
            if (err) throw err;
            if (result === true) {
                req.session.userId = foundUser.Id;
                console.log(req.session);
                foundUser.update({
                last_login: Date.now()
                });
                res.redirect('/')
            } else {
                req.session.userId = null;
                res.status(401).send('incorrect pass');
            }
            });
        } 
        else {
            console.log("user not found");
            res.status(403).redirect("/");
        }
        // res.redirect("/");
        });
    }
  }
  

module.exports = AuthController;