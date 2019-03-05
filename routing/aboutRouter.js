const router = require("express").Router();
const aboutController = require("../controllers/aboutController");

router.get("/", aboutController.about);

module.exports = router;