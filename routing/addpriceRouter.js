const router = require("express").Router();
const addpriceController = require("../controllers/addpriceController");

router.get("/", addpriceController.addprice);

module.exports = router;