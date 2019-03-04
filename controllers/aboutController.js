var User = require("../database/models/users");

const aboutController = {}


aboutController.about = (req, res) => {
    res.render("about", {});
};


module.exports = aboutController;