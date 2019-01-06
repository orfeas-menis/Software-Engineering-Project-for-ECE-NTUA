var express = require('express');
var router = express.Router();
var ApiAuthController = require("../controllers/ApiAuthController")
var ApiProductController = require("../controllers/ApiProductController");
var ApiShopController = require("../controllers/ApiShopController");
var databasePolicy = require("../policies/DatabasePolicy")
var authPolicy = require("../policies/AuthPolicy")


//for the actions that authentication is needed we can do it with a middleware
/*
---------------------------------------- AUTHENTICATION ----------------------------------------
*/

router.post('/login', authPolicy.login, ApiAuthController.login)
router.post('/logout', ApiAuthController.logout)




/*
------------------------------------------- PRODUCTS -------------------------------------------
*/

router.get('/products', databasePolicy.products, ApiProductController.products)
router.post('/products', databasePolicy.addProduct, ApiProductController.addProduct)
router.get('/products/:productId', databasePolicy.findProduct, ApiProductController.findProduct) //get productId in the Controller code with req.params.productId
router.put('/products/:productId', databasePolicy.fullUpdateProduct, ApiProductController.fullUpdateProduct)
router.patch('/products/:productId', databasePolicy.partialUpdateProduct, ApiProductController.partialUpdateProduct)
router.delete('/products/:productId', authPolicy.isLoggedIn, databasePolicy.deleteProduct, ApiProductController.deleteProduct)

/*
--------------------------------------------- SHOPS ---------------------------------------------
*/
router.get('/shops', ApiShopController.shops)

module.exports = router;