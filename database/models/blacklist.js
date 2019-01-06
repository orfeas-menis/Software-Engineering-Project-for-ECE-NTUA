const Sequelize = require("sequelize");
const dbo = require("../connect");
const bcrypt = require("bcryptjs");
const credentials = require("../../config/credentials");


const Blacklist = dbo.define('blacklist', {
    /*
    token
    */
    token: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    /*
    expiration time
    */
    exp: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})



Blacklist.sync({ force: false }).then(() => {
    
});

module.exports = Blacklist;