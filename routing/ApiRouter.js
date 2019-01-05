var express = require('express');
var router = express.Router();
var ApiProductController = require("../controllers/ApiProductController");
var ApiShopController = require("../controllers/ApiShopController");
var databasePolicy = require("../policies/DatabasePolicy")

//for the actions that authentication is needed we can do it with a middleware

/*
------------------------------------------- PRODUCTS -------------------------------------------
*/

router.get('/products', databasePolicy.products, ApiProductController.products)
router.post('/products', databasePolicy.addProduct, ApiProductController.addProduct)
router.get('/products/:productId', databasePolicy.findProduct, ApiProductController.findProduct) //get productId in the Controller code with req.params.productId
router.put('/products/:productId', databasePolicy.fullUpdateProduct, ApiProductController.fullUpdateProduct)
router.patch('/products/:productId', databasePolicy.partialUpdateProduct, ApiProductController.partialUpdateProduct)
router.delete('/products/:productId', ApiProductController.deleteProduct) //we can add a middleware to check if the user is logged in and if it is an admin

/*
--------------------------------------------- SHOPS ---------------------------------------------
*/
router.get('/shops', ApiShopController.shops)

module.exports = router;