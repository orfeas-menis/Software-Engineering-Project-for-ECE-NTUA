const User = require("../database/models/users")
const bcrypt = require("bcryptjs");


const authController = (req, res) => {
}

authController.signUp = (req, res) => {

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
