var     User                = require("../database/models/users");

const loginController = {}


loginController.login = (req, res) => {
    res.render("login_register", {});
};


module.exports = loginController;