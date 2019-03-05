var User = require("../database/models/users");

const accountController = {}


accountController.account = (req, res) => {
    res.render("account", {});
};


module.exports = accountController;