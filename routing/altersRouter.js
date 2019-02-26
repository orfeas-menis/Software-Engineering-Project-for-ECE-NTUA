const express = require('express');
var router = express.Router();
const authPolicy = require("../policies/AuthPolicy")
const altersController = require("../controllers/altersController")

router.post("/userCategories", authPolicy.isLoggedIn, authPolicy.isAdmin, altersController.userCategories)
router.post("/productCategories", authPolicy.isLoggedIn, authPolicy.isAdmin, altersController.productCategories)


module.exports = router;