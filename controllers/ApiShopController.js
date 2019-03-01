var User = require("../database/models/users")
var Shop = require("../database/models/shops")
var Price = require("../database/models/prices")
var alters = require("../config/alters")

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

//Checked!
ApiShopController.addShop = (req, res) => {
    
    sname = req.body.name.toString()
    saddress = req.body.address.toString()
    slng = req.body.lng.toString()
    slat = req.body.lat.toString()
    stags = req.body.tags.toString() // We take as granted that tags have been sent to us as one String and tags are seperated with commas
        
  
    Shop.create({
        name: sname,
        address: saddress,
        lng: slng,
        lat: slat,
        tags: stags
    }).then(shop => {
        if (shop){
            res.status(200).send(shop)
        }
        else{
            res.sendStatus(400).send({message: "Server Error!"})
        }   
    })

}

//Checked!
ApiShopController.findShop = (req, res) => {
    var shopId = parseInt(req.params.shopId)
    Shop.findByPk(shopId).then(shop => {
        if (shop){
            res.status(200).send(shop)
        }
        else{
            res.sendStatus(400)
        }
    })
}

ApiShopController.fullUpdateShop = (req, res) => {
    var shopId = parseInt(req.params.shopId)
    sname = req.body.name.toString()
    saddress = req.body.address.toString()
    slng = req.body.lng.toString()
    slat = req.body.lat.toString()
    stags = req.body.tags.toString()

    Shop.findByPk(shopId).then(shop =>{
        if (shop){
            shop.update({ 
                name: sname,
                address: saddress,
                ng: slng,
                lat: slat,
                tags: stags
            }).then(shop => {
                if (shop){
                    res.status(200).send(shop)
                }
                else{
                    res.sendStatus(400)
                }
            })
        }
    })
}

ApiShopController.partialUpdateShop = (req, res) => {
    var shopId = parseInt(req.params.shopId)
    myJson = {}
    fields = []
    if (req.body.name){
        myJson.name = req.body.name.toString()
        fields.push('name')
    }
    if (req.body.address){
        myJson.address = req.body.address.toString()
        fields.push('address')
    }
    if (req.body.lng){
        myJson.lng = req.body.lng
        fields.push('lng')
    }
    if (req.body.lat){
        myJson.lat = req.body.lat
        fields.push('lat')
    }
    if (req.body.tags){
        myJson.tags = req.body.tags.toString()
        fields.push('tags')
    }
    
    Shop.findByPk(shopId).then(shop =>{
        if (shop){
            shop.update(myJson,{fields: fields}).then(shop => {
                if (shop){
                    res.status(200).send(shop)
                }
                else{
                    res.sendStatus(400)
                }
            })
        }
    })

}

ApiShopController.deleteShop = (req, res) => {
    var shopId = parseInt(req.params.shopId)
    delResponse={}
    delResponse.message = "OK"
    userName = req.decoded.username
    User.findOne({where: {username: userName}}).then(user =>{
        if (user){
            Shop.findByPk(shopId).then(shop =>{
                if (shop){
                    if (user.category == alters.adminUserCategory){
                        shop.destroy({force:true}).then(() => {
                            res.status(200).send(delResponse)
                        })
                    }
                    else if(user.category == alters.standardUserCategory){
                        shop.update({withdrawn: true}, {fields: ['withdrawn']}).then(() =>{
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
