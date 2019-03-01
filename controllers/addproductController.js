var User = require("../database/models/users");

const addproductController = {}


addproductController.addproduct = (req, res) => {
    res.render("addProduct", {});
};


module.exports = addproductController;