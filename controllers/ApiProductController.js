var User = require("../database/models/users")
var Product = require("../database/models/products")
var Shop = require("../database/models/shops")
var Price = require("../database/models/prices")


const ApiProductController = (req, res) => {
}

ApiProductController.products = (req, res) => {
    var format = req.query.format
    var start = 0
    var count = 20
    var status = 'ACTIVE'
    var temp, tempInt
    if (format == null || format == 'json'){
        temp = req.query.start
        tempInt = parseInt(temp)
        if (temp != null && tempInt != NaN){
            start = tempInt
        }
        temp = req.query.count
        tempInt = parseInt(temp)
        if (temp != null && tempInt != NaN){
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

        Product.findAndCountAll({ where: whereClause , order:[[sort[0],sort[1]]]  }).then(result => {
            var total = result.count;
            var slice = result.rows.slice(start,start+count);

            var text = '{ "start" : ' + start + ' , "count" : ' + count + ', "total" : ' + total +  '}';
            var response = JSON.parse(text);
            response.products = slice
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

module.exports = ApiProductController;
/*
Format Handling
JSON -> accepted , XML -> rejected


https://stackoverflow.com/questions/6912584/how-to-get-get-query-string-variables-in-express-js-on-node-js

var format = req.query.format
this is the way to get the query parameter format from the GET request

example:
RESTController.RESTAction = (req, res) => {
    var format = req.query.format
    cnsole.log(format)
};
-----------------------------------------------------------------------------------------------------------------------------
POST request parameters

var format = req.body.format 

Like normal authentication



*/