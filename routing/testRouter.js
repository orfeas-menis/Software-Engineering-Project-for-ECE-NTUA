const router = require("express").Router();
const testController = require("../controllers/testController");

router.get("/", testController.test);

module.exports = router;