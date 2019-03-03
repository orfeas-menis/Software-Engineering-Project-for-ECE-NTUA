const router = require("express").Router();
const addshopController = require("../controllers/addshopController");

router.get("/", addshopController.addshop);

module.exports = router;