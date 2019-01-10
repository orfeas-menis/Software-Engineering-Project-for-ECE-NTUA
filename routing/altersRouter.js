const express = require('express');
var router = express.Router();
const authPolicy = require("../policies/AuthPolicy")
const altersController = require("../controllers/altersController")

router.post("/userCategories", authPolicy.isLoggedIn, altersController.userCategories)
router.post("/productCategories", authPolicy.isLoggedIn, altersController.productCategories)



module.exports = router;