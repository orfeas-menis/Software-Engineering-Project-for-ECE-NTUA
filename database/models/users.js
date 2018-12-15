const Sequelize = require("sequelize");
const dbo = require("../connect");
const bcrypt = require("bcryptjs");
const credentials = require("../../config/credentials");


const User = dbo.define('user', {
    //user id
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    //username
    username: {
        type: Sequelize.STRING(30),
        unique: true,
        primaryKey: true,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [4, 20]
        },
        set(val){
            if(val){
                this.setDataValue('username', val.toLowerCase());
            }
        }
    },
    //user email
    email: {
        type: Sequelize.STRING(30),
        allowNull: false,
        validate: {
            isEmail: true
        },
        unique: true
    },
    //password (hashed)
    password: {
        type: Sequelize.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    last_login: {
        type: Sequelize.DATE
    },
    //category: 0 -> admin , 1 -> user
    category: {
        type: Sequelize.ENUM('0','1'),
        allowNull: false
    },
    last_login: {
        type: Sequelize.DATE
    }
  }
)


User.sync({ force: false }).then(() => {
    User.findOne({ where: { username: credentials.admin_user.username } }).then(admin => {
        if (admin) {
            console.log("there's already an admin in the db. Contact dev team for more info");
        } else {
            console.log("admin not found");
            bcrypt.hash(credentials.admin_user.password, 10, (err, hash) => {
                if (err) return err;
                return User.create({
                    username: credentials.admin_user.username,
                    password: hash,
                    email: credentials.admin_user.email,
                    category: credentials.admin_user.category
                });
            })

        }
    })
});


module.exports = User;