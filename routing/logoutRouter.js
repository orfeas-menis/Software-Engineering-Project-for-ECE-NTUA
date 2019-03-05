const router = require("express").Router();
const logoutController = require("../controllers/logoutController");

router.get("/", logoutController.logout);

module.exports = router;