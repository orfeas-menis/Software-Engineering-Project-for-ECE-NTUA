const router = require("express").Router();
const addproductController = require("../controllers/addproductController");
const authPolicy = require("../policies/AuthPolicy")


router.get("/",  addproductController.addproduct);

module.exports = router;