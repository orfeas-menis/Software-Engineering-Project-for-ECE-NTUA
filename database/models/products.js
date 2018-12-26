const Sequelize = require("sequelize");
const dbo = require("../connect");


const Product = dbo.define('product', {
    /*
    product id
    */
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    /*
    product name
    */
    name: {
        type: Sequelize.STRING(30),
        unique: true,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    /*
    product description
    */
    description: {
        type: Sequelize.STRING
    },
    /*
    product category
    */
    category: {
        type: Sequelize.ENUM('FUEL','SERVICE'),     //to be filled with product categories 
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    /*
    tags for product
    */
    tags: {
        type: Sequelize.ENUM('0','1'), // ???????????? How do I set as type a list or an array of Strings? 
    },
    /*
    withdrawn: true -> our site does not "observe" prices for this product anymore
    */
    withdrawn: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
  }
)

/*
Connect DB and add a sample product
*/

Product.sync({ force: false }).then(() => {
    Product.findOne({ where: { id: 1 } }).then(found => {
        if (found) {
            console.log("there's already a product in the db. Contact dev team for more info");
        } else {
            console.log("product not found");
            Product.create({
                name: 'Gasoline',
                description: 'Normal Gasoline Description',
                category: 'FUEL'
            })

        }
    })
});


module.exports = Product;