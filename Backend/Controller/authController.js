const User = require('../Model/User'); 
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken'); 
const ErrorHandler = require('../utills/ErrorHandler'); 

async function registration(req, res, next) { 
    // 1. Receive & validate data 
    const { email, password} = req.body; 
    if(!email || !password) { 
        next(ErrorHandler.validationError()); 
    } 

    // 2. duplicate email check
    const data = await User.findOne({email}); 
    if(data) {
        return next(ErrorHandler.conflict('Email already in use')); 
    } 

    // 3. ENCRYPT Password 
    const salt = await bcrypt.genSalt(10); 
    const hashedPassword = await bcrypt.hash(password, salt); 

    // 4. Save data & Response 
    const user = new User({ 
        email: email, 
        password: hashedPassword
    }) 

    user.save() 
        .then((data) => { 
            res.json({ 
                message: 'Registration successful', 
                data 
            }) 
        }) 
        .catch(err => { 
            return next(ErrorHandler.serverError(err.message)); 
        }) 
} 

async function login(req, res, next) { 
    // 1. Get data 
    const { email, password } = req.body; 
    if(!email || !password) { 
        next(ErrorHandler.validationError()); 
    } 

    // 2. User exist 
    const user = await User.findOne({email}).select('+password'); 
    if(!user) {
        return next(ErrorHandler.unauthorized('Wrong Email')); 
    } 
    
    // 3. Password matching 
    const result = await user.comparePassword(password, user.password); 
    if(!result) {
        return next(ErrorHandler.unauthorized('Wrong Password'));
    } 
    
    // 4. Send Token 
    const { _id, role } = user; 
    const token = jwt.sign({_id, email, role}, 'This_Is_My_Secret_Key', {expiresIn: '1d'}); 

    res.json({
        message: 'Login Successful', 
        token: `Bearer ${token}`
    })
} 

async function makeAdmin(req, res) {

}


module.exports = {
    registration, 
    login, 
    makeAdmin
} 