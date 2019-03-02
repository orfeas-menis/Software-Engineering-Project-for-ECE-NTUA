const express = require('express');
var router = express.Router();
const authPolicy = require("../policies/AuthPolicy")
const altersController = require("../controllers/altersController")

router.post("/userCategories", authPolicy.isLoggedIn, authPolicy.isAdmin, altersController.userCategories)
router.post("/productCategories", authPolicy.isLoggedIn, authPolicy.isAdmin, altersController.productCategories)
router.get("/userCategories", authPolicy.isLoggedIn, authPolicy.isAdmin, altersController.GetUserCategories)
router.get("/productCategories", authPolicy.isLoggedIn, authPolicy.isAdmin, altersController.GetProductCategories)


module.exports = router;