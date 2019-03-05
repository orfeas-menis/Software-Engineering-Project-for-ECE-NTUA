const Sequelize = require("sequelize");
const dbo = require("../connect");

const Shop = dbo.define('shop', {
    /*
    shop id
    */
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    /*
    shop name
    */
    name: {
        type: Sequelize.STRING(50),
        unique: true,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    /*
    shop address
    */
    address: {
        type: Sequelize.STRING
    },
    /*
    shop longitude (coordinates acording to the World Geodetic System 1984 (WGS84))
    e.g. lng = 23.7275 -> 23.7275° E ,  lng = -23.7275 -> 23.7275° W
    */
    lng: {
        type: Sequelize.FLOAT,    
        allowNull: false
    },
    /*
    shop latitude (coordinates acording to the World Geodetic System 1984 (WGS84))
    e.g. lat = 37.9838 -> 37.9838° N , lat = -37.9838 -> 37.9838° S
    */
    lat: {
    type: Sequelize.FLOAT,    
    allowNull: false
    },
    /*
    tags for shop
    */
    tags: {
        type: Sequelize.STRING // all tags are in one String seperated by comma
    },
    /*
    withdrawn: true -> our site does not "observe" prices from this shop anymore
    */
    withdrawn: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
  }
)

Shop.prototype.toJSON =  function () {
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
Connect DB and add a sample shop
*/

Shop.sync({ force: false }).then(() => {
    Shop.findOne({ where: { id: 1 } }).then(found => {
        if (found) {
            console.log("there's already a shop in the db. Contact dev team for more info");
        } else {
            console.log("shop not found");
            /*Shop.create({
                name: 'Sample Shop',
                address: 'Sample Shop Address',
                lng:  "23.7275",
                lat:  "37.9838"
            }) 
            Shop.create({
                name: 'Sample Shop2',
                address: 'Sample Shop2 Address',
                lng:  "23.724",
                lat:  "37.93"
            }) */

        }
    })
});
module.exports = Shop;