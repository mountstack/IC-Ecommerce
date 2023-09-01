
const ErrorHandler = require('../utills/ErrorHandler'); 

function validate(req, res, next) { 
    
    const { password, confirmPassword } = req.body; 
    if(!password || !confirmPassword) { 
        next(ErrorHandler.validationError()); 
    } 

    if(password !== confirmPassword) { 
        return next(ErrorHandler.badRequest("Password & confirm password doesn't match"))
    } 
    
    next(); 
} 

module.exports = validate; 