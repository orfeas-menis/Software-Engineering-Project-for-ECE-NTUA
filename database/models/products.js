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
        type: Sequelize.STRING // all tags are in one String seperated by comma
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



Product.prototype.toJSON =  function () {
    var values = Object.assign({}, this.get());
    var res = null
    delete values.createdAt;
    delete values.updatedAt;
    if (values.tags != null){
        res = values.tags.split(",");
    }
    values.tags = res
    return values;
  }
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
                category: 'FUEL',
                tags: 'fuel,yeah,new,benzina file'
            })
            Product.create({
                name: 'Gasoline Super',
                description: 'Super Gasoline Description',
                category: 'FUEL',
                tags: 'fuel2,yeah2,new2,benzina22 file'
            })
            Product.create({
                name: 'Gas',
                description: 'Gas Description',
                category: 'FUEL',
                tags: 'my_gas,aerio file',
                withdrawn: 'true'
            })
            Product.create({
                name: 'Petrol',
                description: 'Normal Petrol Description',
                category: 'FUEL',
                tags: 'petreleokilida man,petroleum file'
            })
            Product.create({
                name: 'Whole Cleaning',
                description: 'Whole Car Cleaning Description',
                category: 'SERVICE',
                tags: 'katharisma man,new777,ka8aro file'
            })

        }
    })
});


module.exports = Product;