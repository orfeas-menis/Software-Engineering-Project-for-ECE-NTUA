module.exports = {
    secret: "KAKO LOGOPAIGNIO",
    resave: true,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: 10 * 60 * 1000   //maxAge counts milliseconds => maxAge set to 10 minutes 
    }
};

/*
Express-Session
Documentation: https://www.npmjs.com/package/express-session
*/