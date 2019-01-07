const Product = require("../database/models/products")
const Shop = require("../database/models/shops")

const Joi = require('joi')


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
                category: Joi.string().uppercase().valid('FUEL','SERVICE').required(),
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
    
    // All shops functions are with products code! CHANGE NEEDED!!!!!!!!!!!!!!!!!!
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
    //addShop checked!
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
                Shop.findAll({where: {name: req.body.name}}).then(product =>{
                    if (product.length > 0){
                        res.status(400).send("Product with name: "+ req.body.name + " already exists.")
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
    //findShop checked!
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
               
    }
};
  