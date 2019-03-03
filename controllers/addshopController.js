var User = require("../database/models/users");

const addshopController = {}


addshopController.addshop = (req, res) => {
    res.render("addShop", {});
};


module.exports = addshopController;