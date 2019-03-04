var     User                = require("../database/models/users");

const index_controller = {}


index_controller.indexAction = (req, res) => {
    console.log(req.query.format)
<<<<<<< HEAD
    res.render("apiTest", {});
=======
    res.render("about", {});
>>>>>>> stas
};


module.exports = index_controller;