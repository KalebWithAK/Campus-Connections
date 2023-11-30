const rateLimit = require("express-rate-limit");

exports.loginLimiter = rateLimit({ // Limit Login requests
    windowMs: 60 * 1000, //Locks user out for 1 minute
    max: 5, //5 login attempts beore lock out
    //message: "Too many login request. Try again later sk8er"
    handler: (req, res, next) =>{
        let err = new Error('Too many login request, try again l8er');
        err.status = 429;
        return next(err);
    }
});