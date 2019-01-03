const Product = require("../database/models/products")
const Joi = require('joi')


module.exports = {
    addProduct (req, res, next){
        const schema = {
            name: Joi.string().alphanum().required(),
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
};
  