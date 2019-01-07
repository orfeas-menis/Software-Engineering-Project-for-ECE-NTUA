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
router.post('/logout', authPolicy.isLoggedIn, ApiAuthController.logout)




/*
------------------------------------------- PRODUCTS -------------------------------------------
*/

router.get('/products', databasePolicy.products, ApiProductController.products)
router.post('/products', authPolicy.isLoggedIn, databasePolicy.addProduct, ApiProductController.addProduct)
router.get('/products/:productId', databasePolicy.findProduct, ApiProductController.findProduct) //get productId in the Controller code with req.params.productId
router.put('/products/:productId', authPolicy.isLoggedIn, databasePolicy.fullUpdateProduct, ApiProductController.fullUpdateProduct)
router.patch('/products/:productId', authPolicy.isLoggedIn, databasePolicy.partialUpdateProduct, ApiProductController.partialUpdateProduct)
router.delete('/products/:productId', authPolicy.isLoggedIn, databasePolicy.deleteProduct, ApiProductController.deleteProduct)

/*
--------------------------------------------- SHOPS ---------------------------------------------
*/
router.get('/shops', databasePolicy.shops, ApiShopController.shops)
router.post('/shops', authPolicy.isLoggedIn, databasePolicy.addShop, ApiShopController.addShop)
router.get('/shops/:shopId', databasePolicy.findShop, ApiShopController.findShop) 
router.put('/shops/:shopId', authPolicy.isLoggedIn, databasePolicy.fullUpdateShop, ApiShopController.fullUpdateShop)
//router.patch('/shops/:shopId', authPolicy.isLoggedIn, databasePolicy.partialUpdateShop, ApiShopController.partialUpdateShop)
router.patch('/shops/:shopId',  databasePolicy.partialUpdateShop, ApiShopController.partialUpdateShop)

router.delete('/shops/:shopId', authPolicy.isLoggedIn, databasePolicy.deleteShop, ApiShopController.deleteShop)


module.exports = router;