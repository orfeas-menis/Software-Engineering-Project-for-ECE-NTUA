var User = require("../database/models/users");

const testController = {}


testController.test = (req, res) => {
    res.render("apiTest", {});
};


module.exports = testController;