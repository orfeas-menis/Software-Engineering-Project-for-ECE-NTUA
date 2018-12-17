var express             = require('express'),
    app                 = express(),
    session             = require('express-session'),
    User                = require("./database/models/users"),
    sequelize           = require("./database/connect"),
    index_router        = require("./routing/index_router");

// set view engine as ejs to omit .ejs when rendering a view
app.set("view engine", "ejs");


/*
 - - - - -- - - - - - - - -- - - - - -- MIDDLEWARES - -- - - - - - - -- - - - - - -- - - - - - -- - - -  -- - -
*/

// session configuration and store session cookie in db
var SequelizeStore      = require("connect-session-sequelize")(session.Store);
const myConnectionStore = new SequelizeStore({
    db: sequelize
})
//sessionOptions.store = myConnectionStore;
myConnectionStore.sync();
//app.use(session(sessionOptions));

// set static folder
app.use("/static", express.static("public"));





app.use('/', index_router)


app.listen(process.env.PORT || 1245, () => {
    console.log("Hello World console");
})
