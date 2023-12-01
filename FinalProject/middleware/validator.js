const {body} = require('express-validator');
const {validationResult} = require('express-validator');


//grep or general expression checks id is 24 characters, and only contains 0-9, a-f characters only lower or uppercase
exports.validateId = (req, res, next)=>{
    let id = req.params.id;
    //an objectId is a 24-bit Hex string
    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid story id');
        err.status = 400;
        return next(err);
    } else {
        return next();
    }
};

/*validating the sign to ensure its 
not empty, trims the extra spaces, escapes special characters so no code can be ran
isEmail checks to see if it is a valid email, so we can delete the requirement method on the front end html
normalize email cleans the email up making it lowercase and removes special characters i.e + . */
exports.validateSignUp = [body('first_name','first name cannot be empty').notEmpty().trim().escape(),
body('last_name','last name cannot be empty').notEmpty().trim().escape(),
body('email', 'Must be a valid email address').isEmail().trim().escape().normalizeEmail(),
body('password','Password must be 8 to 64 characters').isLength({min: 8, max: 64})];

exports.validateLogin = [body('email', 'Must be a valid email address').isEmail().trim().escape().normalizeEmail()
,body('password','Password incorrect').isLength({min: 8, max: 64})];

exports.validateLoginSuccess = (req,res,next) =>{
    req.flash('success','Log in successful');
    return next();
}

//checks for errors and displays them
exports.validateResults = (req,res,next) =>{
    let errors = validationResult(req);
    if(!errors.isEmpty()){
        errors.array().forEach(error=>{
            req.flash('error', error.msg);
        });
        return res.redirect('back');
    } else {
        return next();
    }
}


var date = new Date().toLocaleDateString()

exports.validateStory = [
    body('topic','topic can not be empty').notEmpty().trim(),
    body('title','Title cannot be empty').notEmpty().trim().escape(),
    body('details','Content Error').trim().escape(),
    body('img','Img Url Error').trim(),
    body('date','Date cannot be before current date').isAfter(date)
];

