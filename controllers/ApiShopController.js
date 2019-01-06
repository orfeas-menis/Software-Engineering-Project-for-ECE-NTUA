var User = require("../database/models/users")
var Product = require("../database/models/products")
var Shop = require("../database/models/shops")
var Price = require("../database/models/prices")


const ApiShopController = (req, res) => {
}

ApiShopController.shops = (req, res) => {
    var format = req.query.format
    var start = 0
    var count = 20
    var status = 'ACTIVE'
    var temp, tempInt
    if (format == null || format == 'json'){
        temp = req.query.start
        tempInt = parseInt(temp)
        /* 
        We decided to ignore invalid inputs (NaN) and use default values instead (we do not return "Bad request" code 400)
        */
        if (temp != null && !isNaN(tempInt)){ 
            start = tempInt
        }
        temp = req.query.count
        tempInt = parseInt(temp)
        if (temp != null && !isNaN(tempInt)){
            count = tempInt
        }
        var whereClause = {withdrawn: false} //ACTIVE (default) means not withdrawn

        temp = req.query.status
        if (temp == 'WITHDRAWN'){
            status = temp
            whereClause = {withdrawn: true }
        }
        else if (temp == 'ALL'){
            status = temp
            whereClause = {}
        }

        temp = req.query.sort
        var sort= {}
        sort[0] = 'id'
        sort[1] = 'ASC'
        
        if (temp != null){
            
            temp = temp.split('|')
            
            if (temp[0] == 'name'){
                sort[0] = temp[0]
            }
            if (temp[1] == 'DESC'){
                sort[1] = temp[1]
            }
        }

        Shop.findAndCountAll({ where: whereClause , order:[[sort[0],sort[1]]]  }).then(result => {
            var total = result.count;
            var slice = result.rows.slice(start,start+count);

            var text = '{ "start" : ' + start.toString() + ' , "count" : ' + count.toString() + ', "total" : ' + total.toString() +  '}';

            var response = JSON.parse(text);
            response.shops = slice
            res.send(response)
        })
        //res.sendStatus(200)
    }
    else{
        /*
        http://expressjs.com/en/4x/api.html#res.status
        */
        res.sendStatus(400) //res.status(400).send('Bad Request') 
    }
};

// All shops functions are with products code! CHANGE NEEDED!!!!!!!!!!!!!!!!!!

ApiShopController.addShop = (req, res) => {
    
    sname = req.body.name.toString()
    sdescription = req.body.description.toString()
    scategory = req.body.category.toUpperCase()
    stags = req.body.tags.toString() // We take as granted that tags have been sent to us as one String and tags are seperated with commas
        
  
    Product.create({
        name: sname,
        description: sdescription,
        category: scategory,
        tags: stags
    }).then(product => {
        if (product){
            res.status(200).send(product)
        }
        else{
            res.sendStatus(400)
        }   
    })

}

ApiShopController.findShop = (req, res) => {
    var prodId = parseInt(req.params.productId)
    Product.findByPk(prodId).then(product => {
        if (product){
            res.status(200).send(product)
        }
        else{
            res.sendStatus(400)
        }
    })
}

ApiShopController.fullUpdateShop = (req, res) => {
    var prodId = parseInt(req.params.productId)
    sname = req.body.name.toString()
    sdescription = req.body.description.toString()
    scategory = req.body.category.toUpperCase()
    stags = req.body.tags.toString()
    Product.findByPk(prodId).then(product =>{
        if (product){
            product.update({ 
                name: sname, 
                description: sdescription,
                category: scategory,
                tags: stags
            }).then(prod => {
                if (product){
                    res.status(200).send(product)
                }
                else{
                    res.sendStatus(400)
                }
            })
        }
    })
}

ApiShopController.partialUpdateShop = (req, res) => {
    var prodId = parseInt(req.params.productId)
    myJson = {}
    fields = []
    if (req.body.name){
        myJson.name = req.body.name.toString()
        fields.push('name')
    }
    if (req.body.description){
        myJson.description = req.body.description.toString()
        fields.push('description')
    }
    if (req.body.category){
        myJson.category = req.body.category.toUpperCase()
        fields.push('category')
    }
    if (req.body.tags){
        myJson.tags = req.body.tags.toString()
        fields.push('tags')
    }
    
    Product.findByPk(prodId).then(product =>{
        if (product){
            product.update(myJson,{fields: fields}).then(product => {
                if (product){
                    res.status(200).send(product)
                }
                else{
                    res.sendStatus(400)
                }
            })
        }
    })

}

ApiShopController.deleteShop = (req, res) => {
    var prodId = parseInt(req.params.productId)
    delResponse={}
    delResponse.message = "OK"
    userName = req.decoded.username
    User.findOne({where: {username: userName}}).then(user =>{
        if (user){
            Product.findByPk(prodId).then(product =>{
                if (product){
                    if (user.category == 0){
                        product.destroy({force:true}).then(() => {
                            res.status(200).send(delResponse)
                        })
                    }
                    else{
                        product.update({withdrawn: true}, {fields: ['withdrawn']}).then(() =>{
                            res.status(200).send(delResponse)
                        })
                    }  
                }
                else{
                    res.sendStatus(400)
                }
            })
        }
        else{
            res.sendStatus(400)
        }
    }) 
}

module.exports = ApiShopController;
