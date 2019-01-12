var User = require("../database/models/users")
var Product = require("../database/models/products")
var alters = require("../config/alters")


const ApiProductController = (req, res) => {
}

//Checked!
ApiProductController.products = (req, res) => {
    var format = req.query.format
    var start = 0
    var count = 20
    var status = 'ACTIVE'
    var sort= {}
    var temp, tempInt
    temp = req.query.start
    tempInt = parseInt(temp)
    if (temp){
        start = tempInt
    }
    temp = req.query.count
    tempInt = parseInt(temp)
    if (temp){
        count = tempInt
    }

    var whereClause = {withdrawn: false} //ACTIVE (default) means not withdrawn
    temp = req.query.status
    if (temp && (temp.toUpperCase() == 'WITHDRAWN')){
        status = temp
        whereClause = {withdrawn: true }
    }
    else if (temp && (temp.toUpperCase() == 'ALL')){
        status = temp
        whereClause = {}
    }

    temp = req.query.sort
        
    sort[0] = 'id'
    sort[1] = 'ASC'
        
    if (temp){
            
        temp = temp.split('|')
            
        if (temp[0] == 'name'){
            sort[0] = temp[0]
        }
        if (temp[1] == 'DESC'){
            sort[1] = temp[1]
        }
    }

    Product.findAndCountAll({ where: whereClause , order:[[sort[0],sort[1]]]  }).then(result => {
        var total = result.count;
        var slice = result.rows.slice(start,start+count);

        var text = '{ "start" : ' + start + ' , "count" : ' + count + ', "total" : ' + total +  '}';
        var response = JSON.parse(text);
        response.products = slice
        res.send(response)
    })
};

//Checked!
ApiProductController.addProduct = (req, res) => {
    
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

//Checked!
ApiProductController.findProduct = (req, res) => {
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

//Checked!
ApiProductController.fullUpdateProduct = (req, res) => {
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

//Checked!
ApiProductController.partialUpdateProduct = (req, res) => {
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

//Checked! (Remains onDelete Cascade implementation!)
ApiProductController.deleteProduct = (req, res) => {
    var prodId = parseInt(req.params.productId)
    delResponse={}
    delResponse.message = "OK"
    userName = req.decoded.username
    User.findOne({where: {username: userName}}).then(user =>{
        if (user){
            Product.findByPk(prodId).then(product =>{
                if (product){
                    if (user.category == alters.adminUserCategory){
                        product.destroy({force:true}).then(() => {
                            res.status(200).send(delResponse)
                        })
                    }
                    else if(user.category == alters.standardUserCategory){
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


module.exports = ApiProductController;
