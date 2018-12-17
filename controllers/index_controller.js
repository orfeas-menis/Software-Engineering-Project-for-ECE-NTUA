var     User                = require("../database/models/users");

const indexController = {}


indexController.indexAction = (req, res) => {
    User.findAll().then(found => {
        res.send(found)
    })
};


module.exports = indexController;