const router = require("express").Router();
const changeUserCategoryController = require("../controllers/changeUserCategoryController");

router.get("/", changeUserCategoryController.changeUserCategory);

module.exports = router;