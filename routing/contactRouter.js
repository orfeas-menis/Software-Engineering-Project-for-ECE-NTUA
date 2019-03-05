const router = require("express").Router();
const contactController = require("../controllers/contactController");

router.get("/", contactController.contact);

module.exports = router;