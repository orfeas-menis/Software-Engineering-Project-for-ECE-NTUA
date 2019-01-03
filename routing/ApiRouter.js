var express = require('express');
var router = express.Router();
var ApiProductController = require("../controllers/ApiProductController");
var ApiShopController = require("../controllers/ApiShopController");
var databasePolicy = require("../policies/DatabasePolicy")

router.get('/products', ApiProductController.products)
router.get('/products/:productId', ApiProductController.findProduct) //get productId in the Controller code with req.params.productId
router.post('/products', databasePolicy.addProduct, ApiProductController.addProduct)


router.get('/shops', ApiShopController.shops)

module.exports = router;