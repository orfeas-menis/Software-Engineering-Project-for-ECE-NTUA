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
const replace = require('replace-in-file');
const alters = require("../config/alters")

const altersController = (req, res) => {
}


//required body parameter example:  "userCategories": "['admin', 'volunteer']"
altersController.userCategories = (req,res) => {
    userCategories = alters.userCategories
    
    if (req.body.userCategories){
        old = "userCategories: ["
        for(var i in userCategories){
            if(i!=0){
                old = old + ", "
            }
            old = old + "'" + userCategories[i] + "'"
        }
        old = old + "]"
        neo = "userCategories: "+req.body.userCategories
        const options = {
            files: 'config/alters.js',
            from: old,
            to: neo
        };

        replace(options).then(changes => {
            console.log('Modified files:', changes.join(', '));
        })
        .catch(error => {
            console.error('Error occurred:', error);
        });
        res.sendStatus(200)
    }
    else{
        res.sendStatus(400)
    }
    
}

//required body parameter example:  "productCategories": "['FUEL', 'SERVICE']"
altersController.productCategories = (req,res) => {
    productCategories = alters.productCategories
    if (req.body.productCategories){
        old = "productCategories: ["
        for(var i in productCategories){
            if(i!=0){
                old = old + ", "
            }
            old = old + "'" + productCategories[i] + "'"
        }
        old = old + "]"
        neo = "productCategories: "+req.body.productCategories
        const options = {
            files: 'config/alters.js',
            from: old,
            to: neo

        };

        replace(options).then(changes => {
            console.log('Modified files:', changes.join(', '));
        })
        .catch(error => {
            console.error('Error occurred:', error);
        });
        res.sendStatus(200)
    }
    else{
        res.sendStatus(400)
    }
            

}

module.exports = altersController;
