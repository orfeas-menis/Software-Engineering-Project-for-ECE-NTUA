var     User                = require("../database/models/users");

const index_controller = {}


index_controller.indexAction = (req, res) => {
    res.render("login_register", {});
};


module.exports = index_controller;