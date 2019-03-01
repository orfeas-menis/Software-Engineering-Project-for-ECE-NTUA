const router = require("express").Router();
const addproductController = require("../controllers/addproductController");

router.get("/", addproductController.addproduct);

module.exports = router;