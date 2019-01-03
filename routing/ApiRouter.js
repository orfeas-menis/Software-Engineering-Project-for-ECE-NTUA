var express = require('express');
var router = express.Router();
var ApiProductController = require("../controllers/ApiProductController");
var ApiShopController = require("../controllers/ApiShopController");


router.get('/products', ApiProductController.products)

router.get('/shops', ApiShopController.shops)

module.exports = router;