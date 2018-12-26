const Sequelize = require("sequelize");
const dbo = require("../connect");
var User                = require("./users"),
    Product             = require("./products"),
    Shop                = require("./shops");


const Price = dbo.define('price', {
    /*
    price id
    */
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    /*
    price value
    */
    value: {
        type: Sequelize.FLOAT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    /*
    price date
    */
    date: {
        type: Sequelize.DATE
    }
  }
)

Price.belongsTo(User);
Price.belongsTo(Product);
Price.belongsTo(Shop);

/*
Connect DB and add a sample shop
*/

Price.sync({ force: false }).then(() => {
    Price.findOne({ where: { id: 1 } }).then(found => {
        if (found) {
            console.log("there's already a price in the db. Contact dev team for more info");
        } else {
            console.log("price not found");
            Price.create({
                name: 'Sample Price',
                value: 18.99,
                date: '2016-08-09 04:05:02',
                userId: 1,
                productId: 1,
                shopId: 1
            })

        }
    })
});


module.exports = Shop;