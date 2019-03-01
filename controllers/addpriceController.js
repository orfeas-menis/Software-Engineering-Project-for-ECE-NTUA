var User = require("../database/models/users");

const addpriceController = {}


addpriceController.addprice = (req, res) => {
    res.render("addPrice", {});
};


module.exports = addpriceController;