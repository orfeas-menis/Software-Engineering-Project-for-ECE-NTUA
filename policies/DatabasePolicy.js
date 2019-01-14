const Product = require("../database/models/products")
const Shop = require("../database/models/shops")
const User = require("../database/models/users")

const Joi = require('joi')
alters = require("../config/alters")
productCategories = alters.productCategories

module.exports = {
    products(req, res, next){
        
        const schema = {
            start: Joi.number().integer(),
            count: Joi.number().integer(),
            status: Joi.string().uppercase().valid('ALL','WITHDRAWN','ACTIVE'),
            sort: Joi.string().valid('id|ASC','id|DESC','name|ASC','name|DESC'),
            format: Joi.string().lowercase().valid('json')
        };
        const { error } = Joi.validate(req.query, schema);
        if(error){
            switch(error.details[0].context.key){
                case 'start':
                    res.status(400).json({ error: "Invalid start value (Integer required)!"});
                    break;
                case 'count':
                    res.status(400).json({ error: "Invalid start count (Integer required)!"});
                    break;
                case 'status':
                    res.status(400).json({ error: "Invalid status value (Available options: 'ALL' / 'ACTIVE' / 'WITHDRAWN')"});
                    break;
                case 'sort':
                    res.status(400).json({ error: "invalid sort value (Available options: 'id|ASC' / 'id|DESC' / 'name|ASC' / 'name|DESC' )"});
                    break;
                case 'format':
                    res.status(400).json({ error: "invalid format value, only available format is: JSON (value: json)"});
                    break;
                default:
                    res.status(400).json({ error: "Incorrect Input "});
                    break;
            }
        }
        else{
            next();
        }           
    },
    addProduct (req, res, next){
        var format = req.query.format
        // format validation could also be done with joi
        if (format && (format.toLowerCase() != 'json')){
            res.sendStatus(400)
        }
        else{

            const schema = {
                name: Joi.string().max(50).required(),
                description: Joi.string().required(),
                category: Joi.string().uppercase().valid(productCategories).required(),
                tags: Joi.string().required(),
            };
            const { error } = Joi.validate(req.body, schema);

            if(error){
                switch(error.details[0].context.key){
                    case 'name':
                        res.status(400).json({ error: "You must provide a valid name!"});
                        break;
                    case 'category':
                        res.status(400).json({ error: "Category " + req.body.category + " does not exist!"});
                        break;
                    case 'descritpion':
                        res.status(400).json({ error: "Invalid description"});
                        break;
                    case 'tags':
                        res.status(400).json({ error: "invalid tags"});
                        break;
                    default:
                        res.status(400).json({ error: "Incorrect Input "});
                        break;
                }
            } else{
                var flag = true
                Product.findAll({where: {name: req.body.name}}).then(product =>{
                    if (product.length > 0){
                        res.status(400).send("Product with name: "+ req.body.name + " already exists.")
                        flag = false
                    }
                })
                if (flag){
                    next();
                }           
            }
        }
    },
    findProduct(req, res, next){
        var prodId = parseInt(req.params.productId)
        var format = req.query.format
        if ((format && (format.toLowerCase() != 'json')) || isNaN(prodId)){
            res.sendStatus(400)
        }
        else{
            var flag = true
            Product.findByPk(prodId).then(product =>{
                if (!product){
                    res.status(404).send("Product with id: "+ prodId + " does not exist.")
                    flag = false
                }
                else{
                    next();
                }
            })   
        }
               
    },
    fullUpdateProduct (req, res, next){
        var prodId = parseInt(req.params.productId)
        var format = req.query.format
        if ((format && (format.toLowerCase() != 'json')) || isNaN(prodId)){
            res.sendStatus(400)
        }
        else{
            const schema = {
                name: Joi.string().required(),
                description: Joi.string().required(),
                category: Joi.string().valid('FUEL','SERVICE','fuel','service').required(),
                tags: Joi.string().required()
            };
            const { error } = Joi.validate(req.body, schema);
            if(error){
                switch(error.details[0].context.key){
                    case 'name':
                        res.status(400).json({ error: "You must provide a valid name!"});
                        break;
                    case 'category':
                        res.status(400).json({ error: "Category " + req.body.category + " does not exist!"});
                        break;
                    case 'descritpion':
                        res.status(400).json({ error: "Invalid description"});
                        break;
                    case 'tags':
                        res.status(400).json({ error: "invalid tags"});
                        break;
                    default:
                        res.status(400).json({ error: "Incorrect Input "});
                        break;
                }
            } else{
                Product.findByPk(prodId).then(product =>{
                    if (!product){
                        res.status(404).send("Product with id: "+ prodId + " does not exist.")
                    }
                    else{
                        next();
                    }
                })        
            }
        }
    },
    partialUpdateProduct (req, res, next){
        var prodId = parseInt(req.params.productId)
        var format = req.query.format
        if ((format && (format.toLowerCase() != 'json')) || isNaN(prodId)){
            res.sendStatus(400)
        }
        else{
        
            const schema = {
                name: Joi.string(),
                description: Joi.string(),
                category: Joi.string().valid('FUEL','SERVICE','fuel','service'),
                tags: Joi.string()
            };
            const { error } = Joi.validate(req.body, schema);

            if(error){
                switch(error.details[0].context.key){
                    case 'name':
                        res.status(400).json({ error: "You must provide a valid name!"});
                        break;
                    case 'category':
                        res.status(400).json({ error: "Category " + req.body.category + " does not exist!"});
                        break;
                    case 'descritpion':
                        res.status(400).json({ error: "Invalid description"});
                        break;
                    case 'tags':
                        res.status(400).json({ error: "invalid tags"});
                        break;
                    default:
                        res.status(400).json({ error: "Incorrect Input "});
                        break;
                }
            } else{
                Product.findByPk(prodId).then(product =>{
                    if (!product){
                        res.status(404).send("Product with id: "+ prodId + " does not exist.")
                    }
                    else{
                        next();
                    }
                })
                           
            }
        }
    },
    deleteProduct(req, res, next){
        var prodId = parseInt(req.params.productId)
        var format = req.query.format
        if ((format && (format.toLowerCase() != 'json')) || isNaN(prodId)){
            res.sendStatus(400)
        }
        else{
            Product.findByPk(prodId).then(product =>{
                if (!product){
                    res.status(404).send("Product with id: "+ prodId + " does not exist.")
                }
                else{
                    next();
                }
            }) 
        }
               
    },
    
    shops(req, res, next){
        
        const schema = {
            start: Joi.number().integer(),
            count: Joi.number().integer(),
            status: Joi.string().uppercase().valid('ALL','WITHDRAWN','ACTIVE'),
            sort: Joi.string().valid('id|ASC','id|DESC','name|ASC','name|DESC'),
            format: Joi.string().lowercase().valid('json')
        };
        const { error } = Joi.validate(req.query, schema);
        if(error){
            switch(error.details[0].context.key){
                case 'start':
                    res.status(400).json({ error: "Invalid start value (Integer required)!"});
                    break;
                case 'count':
                    res.status(400).json({ error: "Invalid start count (Integer required)!"});
                    break;
                case 'status':
                    res.status(400).json({ error: "Invalid status value (Available options: 'ALL' / 'ACTIVE' / 'WITHDRAWN')"});
                    break;
                case 'sort':
                    res.status(400).json({ error: "invalid sort value (Available options: 'id|ASC' / 'id|DESC' / 'name|ASC' / 'name|DESC' )"});
                    break;
                case 'format':
                    res.status(400).json({ error: "invalid format value, only available format is: JSON (value: json)"});
                    break;
                default:
                    res.status(400).json({ error: "Incorrect Input "});
                    break;
            }
        }
        else{
            next();
        }           
    },
    addShop (req, res, next){
        var format = req.query.format
        // format validation could also be done with joi
        if (format && (format.toLowerCase() != 'json')){
            res.sendStatus(400)
        }
        else{

            const schema = {
                name: Joi.string().required(),
                address: Joi.string().required(),
                lng: Joi.number().required(),
                lat: Joi.number().required(),
                tags: Joi.string().required()
            };
            const { error } = Joi.validate(req.body, schema);

            if(error){
                switch(error.details[0].context.key){
                    case 'name':
                        res.status(400).json({ error: "You must provide a valid name!"});
                        break;
                    case 'address':
                        res.status(400).json({ error: "You must provide a valid address!"});
                        break;
                    case 'lng':
                        res.status(400).json({ error: "Invalid longitude value"});
                        break;
                    case 'lat':
                        res.status(400).json({ error: "Invalid latitude value"});
                        break;
                    case 'tags':
                        res.status(400).json({ error: "invalid tags"});
                        break;
                    default:
                        res.status(400).json({ error: "Incorrect Input "});
                        break;
                }
            } 
            else{
                var lngFloat = parseFloat(req.body.lng)
                var latFloat = parseFloat(req.body.lat)
                var flag = true
                if(isNaN(lngFloat) || isNaN(latFloat) || lngFloat < -180.0 || lngFloat > 180.0 || latFloat < -90.0 || latFloat > 90.0){
                    flag = false
                    res.status(400).send("Invalid Coordinates!")
                }
                Shop.findAll({where: {name: req.body.name}}).then(shop =>{
                    if (shop.length > 0){
                        res.status(400).send("Shop with name: "+ req.body.name + " already exists.")
                    }
                    else{
                        if (flag){
                            next();
                        }
                    }
                })          
            }
        }
    },
    findShop(req, res, next){
        var shopId = parseInt(req.params.shopId)
        var format = req.query.format
        if ((format && (format.toLowerCase() != 'json')) || isNaN(shopId)){
            res.sendStatus(400)
        }
        else{
            Shop.findByPk(shopId).then(shop =>{
                if (!shop){
                    res.status(404).send("Shop with id: "+ shopId + " does not exist.")
                }
                else{
                    next();
                }
            })   
        }
               
    },
    fullUpdateShop (req, res, next){
        var shopId = parseInt(req.params.shopId)
        var format = req.query.format
        if ((format && (format.toLowerCase() != 'json')) || isNaN(shopId)){
            res.sendStatus(400)
        }
        else{
            const schema = {
                name: Joi.string().required(),
                address: Joi.string().required(),
                lng: Joi.number().required(),
                lat: Joi.number().required(),
                tags: Joi.string().required()
            };
            const { error } = Joi.validate(req.body, schema);
            if(error){
                switch(error.details[0].context.key){
                    case 'name':
                        res.status(400).json({ error: "You must provide a valid name!"});
                        break;
                    case 'address':
                        res.status(400).json({ error: "You must provide a valid address!"});
                        break;
                    case 'lng':
                        res.status(400).json({ error: "Invalid longitude value"});
                        break;
                    case 'lat':
                        res.status(400).json({ error: "Invalid latitude value"});
                        break;
                    case 'tags':
                        res.status(400).json({ error: "invalid tags"});
                        break;
                    default:
                        res.status(400).json({ error: "Incorrect Input "});
                        break;
                }
            } 
            else{
                var lngFloat = parseFloat(req.body.lng)
                var latFloat = parseFloat(req.body.lat)
                var flag = true
                if(isNaN(lngFloat) || isNaN(latFloat) || lngFloat < -180.0 || lngFloat > 180.0 || latFloat < -90.0 || latFloat > 90.0){
                    flag = false
                    res.status(400).send("Invalid Coordinates!")
                }
                Shop.findByPk(shopId).then(shop =>{
                    if (!shop){
                        res.status(404).send("Shop with id: "+ shopId + " does not exist.")
                    }
                    else{
                        if(flag){
                            next();
                        }
                    }
                })          
            }
        }
    },
    partialUpdateShop (req, res, next){
        var shopId = parseInt(req.params.shopId)
        var format = req.query.format
        if ((format && (format.toLowerCase() != 'json')) || isNaN(shopId)){
            res.sendStatus(400)
        }
        else{
            const schema = {
                name: Joi.string(),
                address: Joi.string(),
                lng: Joi.number(),
                lat: Joi.number(),
                tags: Joi.string()
            };
            const { error } = Joi.validate(req.body, schema);
            if(error){
                switch(error.details[0].context.key){
                    case 'name':
                        res.status(400).json({ error: "You must provide a valid name!"});
                        break;
                    case 'address':
                        res.status(400).json({ error: "You must provide a valid address!"});
                        break;
                    case 'lng':
                        res.status(400).json({ error: "Invalid longitude value"});
                        break;
                    case 'lat':
                        res.status(400).json({ error: "Invalid latitude value"});
                        break;
                    case 'tags':
                        res.status(400).json({ error: "invalid tags"});
                        break;
                    default:
                        res.status(400).json({ error: "Incorrect Input "});
                        break;
                }
            } 
            else{
                var flag = true
                if (req.body.lat){
                    var latFloat = parseFloat(req.body.lat)
                    if(isNaN(latFloat) || latFloat < -90.0 || latFloat > 90.0){
                        flag = false
                        res.status(400).send("Invalid Coordinates!")
                    }
                }
                if ( req.body.lng){
                    var lngFloat = parseFloat(req.body.lng)
                    if(isNaN(lngFloat) || lngFloat < -180.0 || lngFloat > 180.0){
                        flag = false
                        res.status(400).send("Invalid Coordinates!")
                    }
                }
                Shop.findByPk(shopId).then(shop =>{
                    if (!shop){
                        res.status(404).send("Shop with id: "+ shopId + " does not exist.")
                    }
                    else{
                        if (flag){
                            next();
                        }
                    }
                })          
            }
        }
    },
    deleteShop(req, res, next){
        var shopId = parseInt(req.params.shopId)
        var format = req.query.format
        if ((format && (format.toLowerCase() != 'json')) || isNaN(shopId)){
            res.sendStatus(400)
        }
        else{
            Shop.findByPk(shopId).then(shop =>{
                if (!shop){
                    res.status(404).send("Shop with id: "+ shopId + " does not exist.")
                }
                else{
                    next();
                }
            }) 
        }
               
    },
    prices(req, res, next){
        
        const schema = {
            start: Joi.number().integer(),
            count: Joi.number().integer(),
            geoDist: Joi.number(),
            geoLng: Joi.number(),
            geoLat: Joi.number(),
            dateFrom: Joi.date(),
            dateTo: Joi.date(),
            products: Joi,
            shops: Joi,
            tags: Joi,
            sort: Joi.string().valid('geo.dist,|ASC','geo.dist,|DESC','price|ASC','price|DESC','date|ASC','date|DESC'),
            format: Joi.string().lowercase().valid('json')
        };
        const { error } = Joi.validate(req.query, schema);
        if(error){ 
            res.status(400).json({ error: "Incorrect Input "});
        }
        else{
            var counter = 0
            var flag = true
            if (req.query.geoDist){
                counter = counter + 1
            }
            if (req.query.geoLng){
                counter = counter + 1
                var lngFloat = parseFloat(req.query.geoLng)
                if(isNaN(lngFloat) || lngFloat < -180.0 || lngFloat > 180.0){
                    flag = false
                    counter = -10
                    res.status(400).send("Invalid Coordinates!")
                    //console.log('1')
                }
            }
            if (req.query.geoLat && flag){
                counter = counter + 1
                var latFloat = parseFloat(req.query.geoLat)
                if(isNaN(latFloat) || latFloat < -90.0 || latFloat > 90.0){
                    flag = false
                    counter = -10
                    //console.log('2')
                    res.status(400).send("Invalid Coordinates!")
                }
            }
            if (counter > 0 && counter < 3 && flag){
                flag = false
                //console.log('3')
                res.sendStatus(400)
            }
            counter = 0
            if (req.query.dateFrom){
                counter = counter + 1
            }
            if (req.query.dateTo){
                counter = counter + 1
            }
            if (flag && counter == 1){
                flag = false
                //console.log('4')
                res.sendStatus(400)
            }
            var temp = req.query.shops
            if (temp){
                if(isNaN(parseInt(temp))){
                    for (var i in temp){
                        if(isNaN(parseInt(temp[i])) && flag){
                            
                            flag = false
                            //console.log('5')
                            res.sendStatus(400)
                        }
                    } 
                }
            }
            var temp = req.query.products
            if (temp){
                if(isNaN(parseInt(temp))){
                    for (var i in temp){
                        if(isNaN(parseInt(temp[i])) && flag){
                            flag = false
                            //console.log('6')
                            res.sendStatus(400)
                        }
                    } 
                }
            }
            if (flag){
                next();
            }
        }           
    },
    addPrice(req, res, next){
        var format = req.query.format
        if (format && (format.toLowerCase() != 'json')){
            res.sendStatus(400)
        }
        else{

            const schema = {
                price: Joi.number().required(),
                shopId: Joi.number().required(),
                productId: Joi.number().required(),
                dateFrom: Joi.date().required(),
                dateTo: Joi.date().required()
            };
            const { error } = Joi.validate(req.body, schema);

            if(error){
                res.status(400).json({ error: "Incorrect Input "});
            } 
            else{
                var flag = true
                var price = parseFloat(req.body.price)
                if (isNaN(price)){
                    res.sendStatus(400)
                    flag = false
                }
                var shopId = parseInt(req.body.shopId)
                if(isNaN(shopId)){
                    flag = false
                    res.sendStatus(400)
                }
                var productId = parseInt(req.body.productId)
                if (isNaN(productId)){
                    flag = false
                    res.sendStatus(400)
                } 

                if (req.body.dateFrom > req.body.dateTo){
                    flag = false
                    res.sendStatus(400)
                }

                if (flag){
                    Shop.findByPk(shopId).then(shop =>{

                        if (!shop){
                            res.status(400).send("Shop with id: "+ shopId + " does not exist.")
                            flag = false
                        }
                        else{
                            Product.findByPk(productId).then(product => {
                                if (!product && flag){
                                    res.status(400).send("Product with id: "+ productId + " does not exist.")
                                    flag = false
                                }
                            })
                            if (flag){
                                next()
                            }
                        }
                    }) 
                }
                         
            }
        }
    },
    addUser(req, res, next){
        const schema = {
            username: Joi.string().min(4).max(30).required(),
            password: Joi.string().required(),           
            email: Joi.string().email().required()
        };
        const { error } = Joi.validate(req.body, schema);
        if(error){
            switch(error.details[0].context.key){
                case 'username':
                    res.status(400).json({message: "Invalid username! (Username length must be 4-30.)"});
                    break;
                case 'password':
                    res.status(400).json({message: "Invalid Password!"});
                    break;
                case 'email':
                    res.status(400).json({message: "Invalid email!"});
                    break;
                default:
                    res.status(400).json({message: "Incorrect Input!"});
                    break;
            }
        } 
        else{
            
            User.findAll({where: {username: req.body.username}}).then(user =>{
                if (user.length > 0){
                    var obj = {}
                    obj.message = "User with username: "+ req.body.username + " already exists."
                    res.status(400).send(obj)
                }
                else{
                    User.findAll({where: {email: req.body.email}}).then(user2 =>{
                        if (user2.length > 0){
                            var obj = {}
                            obj.message = "User with email: "+ req.body.email + " already exists."
                            res.status(400).send(obj)
                        }
                        else{
                            next()
                        }
                    })          
                }
            })          
        }
    },
    changeCategory(req, res, next){
        category = req.body.category
        userId = parseInt(req.params.userId)
        if (category && !isNaN(userId)){
            if ((alters.userCategories).includes(category)){
                next()
            }
            else{
                res.sendStatus(400)
            }
        }
        else{
            res.sendStatus(400)
        }
    },
    updateUser(req, res, next){
        const schema = {
            username: Joi.string().max(30),
            password: Joi.string(),
            email: Joi.string().email()
        };
        const { error } = Joi.validate(req.body, schema);

        if(error){
            res.status(400).json({ error: "Incorrect Input "});
        } 
        else{
            
            User.findAll({where: {username: req.body.username}}).then(user =>{
                if (user.length > 0){
                    res.status(400).send("User with username: "+ req.body.username + " already exists.")
                }
                else{
                    User.findAll({where: {email: req.body.email}}).then(user2 =>{
                        if (user2.length > 0){
                            res.status(400).send("User with email: "+ req.body.email + " already exists.")
                        }
                        else{
                            next()
                        }
                    })          
                }
            })          
        }
    }
};
  