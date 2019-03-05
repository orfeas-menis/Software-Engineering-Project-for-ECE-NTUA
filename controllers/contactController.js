var User = require("../database/models/users");

const contactController = {}


contactController.contact = (req, res) => {
    res.render("contact", {});
};


module.exports = contactController;