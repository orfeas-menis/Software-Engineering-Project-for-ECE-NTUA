var     User                = require("../database/models/users");

const index_controller = {}


index_controller.indexAction = (req, res) => {
    console.log(req.query.format)
<<<<<<< HEAD
    res.render("account", {});
=======
    res.render("index", {});
>>>>>>> master
};


module.exports = index_controller;