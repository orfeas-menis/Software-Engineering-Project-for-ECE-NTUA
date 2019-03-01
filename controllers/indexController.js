var     User                = require("../database/models/users");

const index_controller = {}


index_controller.indexAction = (req, res) => {
    console.log(req.query.format)
    res.render("logout", {});
};


module.exports = index_controller;