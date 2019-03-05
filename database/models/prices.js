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
    price: {
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

Price.belongsTo(User, { onDelete: 'CASCADE', hooks:false});
Price.belongsTo(Product, { onDelete: 'CASCADE', hooks:false});
Price.belongsTo(Shop, { onDelete: 'CASCADE', hooks:false});

Price.prototype.toJSON =  function () {
    var values = Object.assign({}, this.get());
    var res = null
    delete values.createdAt;
    delete values.updatedAt;
    var temp = values.date
    var dd = temp.getDate()
    var mm = temp.getMonth() + 1 
    var yyyy = temp.getFullYear()
    if (dd<10){
        dd = "0" + dd
    }
    if (mm<10){
        mm = "0" + mm
    }
    values.date = yyyy + "-" + mm + "-" + dd
    
    return values;
}
/*
Connect DB and add a sample shop
*/

Price.sync({ force: false }).then(() => {
    var date = new Date().setHours(2,0,0,0)
    Price.findOne({ where: { id: 1 } }).then(found => {
        if (found) {
            console.log("there's already a price in the db. Contact dev team for more info");
        } else {
            console.log("price not found");
            /*Price.create({
                name: 'Sample Price',
                price: 18.99,
                date: '2016-08-09',
                userId: 1,
                productId: 1,
                shopId: 1
            }),
            Price.create({
                name: 'Sample Price2',
                price: 19.0,
                date: date,
                userId: 1,
                productId: 1,
                shopId: 1
            }),
            Price.create({
                name: 'Sample Price 3',
                price: 189,
                date: date,
                userId: 1,
                productId: 2,
                shopId: 1
            })
            */

        }
    })
});


module.exports = Price;