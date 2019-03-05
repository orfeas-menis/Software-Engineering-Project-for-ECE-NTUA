const Sequelize = require("sequelize");
const Credentials = require("../config/credentials.js");

const sequelize = new Sequelize(Credentials.database.db_name, Credentials.database.username, Credentials.database.password, {
    define: {
        charset: 'utf8',
        collate: 'utf8_general_ci'
    },
    host: Credentials.host,
    dialect: "mariadb"
})
/*****
https://stackoverflow.com/questions/35796963/sequelize-error-with-mariadb
npm install --save sequelize@next
npm install --save mariadb
*****/
sequelize.authenticate()
.then(() => {
    console.log("DB: connection success");
})
.catch(err => {
    console.error("Unable to connect to the database", err);
})

module.exports = sequelize;