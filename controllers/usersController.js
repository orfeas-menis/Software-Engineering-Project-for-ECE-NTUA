var User = require("../database/models/users")
const jwt = require('jsonwebtoken')
const credentials = require("../config/credentials");
const bcrypt = require("bcryptjs");
const Sequelize = require("sequelize");
const Op = Sequelize.Op
const alters = require("../config/alters")

const usersController = (req, res) => {
}

usersController.users = (req, res) => {
    User.findAll().then(users => {
        if (users){
            res.status(200).send(users)
        }
        else{
            res.sendStatus(400)
        }
    })
}

usersController.addUser = (req, res) => {
    username = req.body.username
    password = req.body.password
    email = req.body.email
        
  
    bcrypt.hash(password, 10, (err, hash) => {
        if (err){
            res.sendStatus(400)
        }
        else{
            User.create({
                username: username,
                password: hash,
                email:email,
                category: alters.standardUserCategory
            }).then(user => {
                if (user){
                    var token = jwt.sign({username: username},
                        credentials.secret,
                        { expiresIn: '1 h'} // expires in 1 hour
                    );
                    var now = new Date()
                    user.update({"lastLogin": now},{fileds:["lastLogin"]})
                    res.status(200).send(token)
                }
                else{
                    res.sendStatus(400)
                }
            })
        }  
    })

}

usersController.changeCategory = (req, res) => {
    var userId = parseInt(req.params.userId)
    var category = req.body.category
    User.findByPk(userId).then(user => {
        if (user){
            user.update({"category": category},{fileds:["category"]})
            res.status(200).send("OK")
        }
        else{
            res.sendStatus(400)
        }
    })
}


usersController.updateUser = (req, res) => {
    flag = true
    username = req.body.username
    password = req.body.password
    email = req.body.email
    myJson = {}
    fields = []
    username = req.decoded.username
    if (req.body.username){
        myJson.username = req.body.username
        fields.push('username')
    }
    
    if (req.body.email){
        myJson.email = req.body.email
        fields.push('email')
    }

    if (req.body.password){
        fields.push('password')
        flag = false
    }
    User.findOne({where: {username:username}}).then(user =>{
        if(flag){
            user.update(myJson,{fields:fields}).then(user2 => {
                if (user2){
                    var token = jwt.sign({username: user2.username},
                        credentials.secret,
                        { expiresIn: '1 h'} // expires in 1 hour
                    );
                    var now = new Date()
                    user2.update({"lastLogin": now},{fileds:["lastLogin"]})
                    res.status(200).send(token)
                }
                else{
                    res.sendStatus(400)
                }
            })
        }
        else{
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err){
                    res.sendStatus(400)
                }
                else{
                    myJson.password = hash
                    user.update(myJson,{fields:fields}).then(user2 => {
                        if (user2){
                            var token = jwt.sign({username: user2.username},
                                credentials.secret,
                                { expiresIn: '1 h'} // expires in 1 hour
                            );
                            var now = new Date()
                            user2.update({"lastLogin": now},{fileds:["lastLogin"]})
                            res.status(200).send(token)
                        }
                        else{
                            res.sendStatus(400)
                        }
                    })
                }  
            })
        }
    })
}

usersController.deleteUser = (req, res) => {
    userId = parseInt(req.params.userId)
    if(!isNaN(userId)){
        User.findByPk(userId).then(user =>{
            if (user){
                
            user.destroy({force:true}).then(() => {
                    res.status(200).send("OK")
                })
            }
            else{
                res.sendStatus(400)
            }
        })
    }
    else{
        res.sendStatus(400)
    }
}

usersController.whoAmI = (req, res) => {
    if(req.decoded){
        username = req.decoded.username
        userId = req.decoded.userId
        email = req.decoded.email
        category = req.decoded.category
        var myJson = {}
        myJson.username = username
        myJson.userId = iserId
        myJson.email = email
        myJson.category = category
        res.send(myJson).status(200)
    }
    else{
        res.sendStatus(400)
    }
}

module.exports = usersController;
