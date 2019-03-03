var     User                = require("../database/models/users");

const index_controller = {}


index_controller.indexAction = (req, res) => {
    console.log(req.query.format)
<<<<<<< HEAD
    res.render("addProduct", {});
=======
    res.render("addPrice", {});
>>>>>>> a61c676f7e990b694b32719a0f89390b388629a6
};


module.exports = index_controller;