const express = require('express');
var router = express.Router();
const authPolicy = require("../policies/AuthPolicy")
const usersController = require("../controllers/usersController")
var databasePolicy = require("../policies/DatabasePolicy")

router.get("/", authPolicy.isLoggedIn, authPolicy.isAdmin, usersController.users)
router.get("/:userId", authPolicy.isLoggedIn, authPolicy.isAdmin, usersController.userId)
router.post("/", databasePolicy.addUser , usersController.addUser)
router.put("/:userId", authPolicy.isLoggedIn, authPolicy.isAdmin, databasePolicy.changeCategory, usersController.changeCategory)
router.patch("/", authPolicy.isLoggedIn, usersController.updateUser)
router.delete("/:userId", authPolicy.isLoggedIn, authPolicy.isAdmin, usersController.deleteUser)
router.get("/whoami", authPolicy.isLoggedIn, usersController.whoAmI)



module.exports = router;