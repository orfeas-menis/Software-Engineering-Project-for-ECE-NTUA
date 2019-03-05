const logoutController = {}


logoutController.logout = (req, res) => {
    res.render("logout", {});
};


module.exports = logoutController;