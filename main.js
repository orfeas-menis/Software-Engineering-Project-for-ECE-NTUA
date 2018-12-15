var express             = require('express'),
    app                 = express(),
    sequelize           = require("./database/connect");


// set view engine as ejs to omit .ejs when rendering a view
app.set("view engine", "ejs");

// set static folder
app.use("/static", express.static("public"));

app.get('/',(req,res) => {
    res.send("Hello World!");
})

app.listen(process.env.PORT || 1245, () => {
    console.log("Hello World console");
})