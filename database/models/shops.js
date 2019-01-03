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
        type: Sequelize.STRING(30),
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
    e.g. lng = "23.7275E" -> 23.7275° E
    */
    lng: {
        type: Sequelize.STRING,    
        allowNull: false
    },
    /*
    shop latitude (coordinates acording to the World Geodetic System 1984 (WGS84))
    e.g. lat = "37.9838N" -> 37.9838° N
    */
    lat: {
    type: Sequelize.STRING,    
    allowNull: false
    },
    /*
    shop location (coordinates)
    We either use location and get longitude and latityde from it, or we use seperate longitude and latitude (declared above)
    https://stackoverflow.com/questions/44675630/geospatial-distance-calculator-using-sequelize-mysql
    */
    location: {
        type: Sequelize.GEOMETRY('POINT') 
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


/*
Connect DB and add a sample shop
*/

Shop.sync({ force: false }).then(() => {
    Shop.findOne({ where: { id: 1 } }).then(found => {
        if (found) {
            console.log("there's already a shop in the db. Contact dev team for more info");
        } else {
            console.log("shop not found");
            Shop.create({
                name: 'Sample Shop',
                address: 'Sample Shop Address',
                lng:  "23.7275E",
                lat:  "37.9838N"
            })

        }
    })
});
module.exports = Shop;