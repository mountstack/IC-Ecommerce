
const jwt = require('jsonwebtoken'); 
const ErrorHandler = require('../utills/ErrorHandler'); 

const authenticate = (req, res, next) => {  
    try { 
        const token = req.headers.authorization.split(' ')[1]; 
        const decode = jwt.verify(token, 'This_Is_My_Secret_Key'); 
        req.user = decode; 
        next(); 
    } 
    catch (error) { 
        next(ErrorHandler.unauthorized('You are not loggedin..')); 
    } 
} 


const accessTo = (permissionList) => { 
    return function middleware(req, res, next) { 
        if(!permissionList.includes(req.user.role)) { 
            next(ErrorHandler.forbidden()); 
        } 
        
        next(); 
    } 
} 

module.exports = {
    authenticate, 
    accessTo
}; 