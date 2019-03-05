var express             = require('express'),
    app                 = express(),
    session             = require('express-session'),
    bodyParser          = require("body-parser"),
    SequelizeStore      = require("connect-session-sequelize")(session.Store),

    User                = require("./database/models/users"),
    Product             = require("./database/models/products"),
    Shop                = require("./database/models/shops"),
    Price               = require("./database/models/prices"),
    sequelize           = require("./database/connect"),
    indexRouter         = require("./routing/indexRouter"),
    loginRouter         = require("./routing/loginRouter"),
    logoutRouter        = require("./routing/logoutRouter"),
    ApiRouter           = require("./routing/ApiRouter"),
    altersRouter        = require("./routing/altersRouter"),
    userManagementRouter= require("./routing/userManagementRouter")
    sessionOptions      = require("./config/session"),
    addpriceRouter      = require("./routing/addpriceRouter"),
    testRouter          = require("./routing/testRouter");
    addproductRouter    = require("./routing/addproductRouter");
    addshopRouter       = require("./routing/addshopRouter");

/*
set view engine as ejs to omit .ejs when rendering a view
--------------------------------------------------------------------------------------------
Documentation: https://expressjs.com/en/guide/using-template-engines.html
 */
app.set("view engine", "ejs");


/*
 - - - - - - - - - - - - - - - - - - MIDDLEWARES - - - - - - - - - - - - - - - - - - - - - - - -
Middleware is/are function(s) run between the client request and the server answer.
The most common middleware functionality needed are error managing, database interaction,
getting info from static files or other resources. To move on the middleware stack the next
callback must be called, you can see it in the end of middleware function to move to the next step in the flow.

Documentation: https://expressjs.com/en/guide/using-middleware.html
*/

/*
Add bodyParser middleware to parse POST request body
--------------------------------------------------------------------------------------------
Documentation: https://www.npmjs.com/package/body-parser
*/
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/*
Session configuration and store session cookie in db
--------------------------------------------------------------------------------------------
Documentation1: https://www.npmjs.com/package/express-session
Documentation2:https://www.npmjs.com/package/connect-session-sequelize
*/
const myConnectionStore = new SequelizeStore({
    db: sequelize
})
sessionOptions.store = myConnectionStore;
myConnectionStore.sync();
app.use(session(sessionOptions));

/*
Set static folder
--------------------------------------------------------------------------------------------
Documentation: https://expressjs.com/en/starter/static-files.html
*/
app.use("/static", express.static("public"));



/*
 - - - - -- - - - - - - - -- - - - - -- ROUTING - -- - - - - - - -- - - - - - -- - - - - - -- - - -  -- - -
*/

//testing
app.use('/', indexRouter)
app.use('/login', loginRouter)
app.use('/logout', logoutRouter)
app.use('/addprice', addpriceRouter)
app.use('/addshop',addshopRouter)
app.use('/addproduct', addproductRouter)
app.use('/observatory/api', ApiRouter)
app.use('/alters', altersRouter)
app.use('/userManagement', userManagementRouter)
app.use('/test', testRouter)


app.listen(1245, () => {
    console.log("Hello World console");
})

app.listen(8765, () => {
    console.log("Hello World console");
})

var fs = require('fs');

// SET UP KEY FOR HTTPS
var key = fs.readFileSync('./SSL KEYS/15886504_stas.com.key');
var cert = fs.readFileSync( './SSL KEYS/15886504_stas.com.cert' );
var options = {
    key: key,
    cert: cert
  };

var https = require('https');
https.createServer(options, app).listen(8766);
