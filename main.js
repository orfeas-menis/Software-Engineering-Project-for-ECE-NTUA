var express             = require('express'),
    app                 = express(),
    User                = require("./database/models/users"),
    sequelize           = require("./database/connect");


// set view engine as ejs to omit .ejs when rendering a view
app.set("view engine", "ejs");

// set static folder
app.use("/static", express.static("public"));

app.get('/',(req,res) => {
    res.send("Hello World!");
})


// session configuration and store session cookie in db
/*var SequelizeStore      = require("connect-session-sequelize")(session.Store);
const myConnectionStore = new SequelizeStore({
    db: sequelize
})
sessionOptions.store = myConnectionStore;
myConnectionStore.sync();
app.use(session(sessionOptions));
*/

app.listen(process.env.PORT || 1245, () => {
    console.log("Hello World console");
})
