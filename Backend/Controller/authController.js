const User = require('../Model/User'); 
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken'); 
const ErrorHandler = require('../utills/ErrorHandler'); 

async function registration(req, res, next) { 
    // 1. Receive & validate data 
    const { email, password} = req.body; 
    if(!email || !password) { 
        next(ErrorHandler.validationError('Email and passwords are required!')); 
    } 

    // 2. duplicate email check
    const data = await User.findOne({email}); 
    if(data) {
        return next(ErrorHandler.conflict('Email already in use!')); 
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

async function makeAdmin(req, res, next) { 
    const { userId } = req.body; 

    const user = await User.findById(userId); 
    if(!user) { 
        return next(ErrorHandler.notFound('User not found')); 
    } 

    if(user.role === 'admin') { 
        return next(ErrorHandler.conflict(`${user.email} already an admin. Please refresh the page.`)); 
    } 

    try { 
        await User.findByIdAndUpdate({_id: userId}, {$set: { role: 'admin' }}); 

        res.json({ 
            'message': `${user.email} successfully promoted to admin` 
        }); 
    } 
    catch (error) { 
        next(ErrorHandler.serverError()); 
    } 
} 

async function cancelAdmin(req, res, next) {
    const { userId } = req.body; 

    const user = await User.findById(userId); 
    if(!user) { 
        return next(ErrorHandler.notFound('User not found')); 
    } 

    if(user.role === 'user') { 
        return next(ErrorHandler.conflict(`${user.email} is not admin. Please refresh the page.`)); 
    } 

    try { 
        await User.findByIdAndUpdate({_id: userId}, {$set: { role: 'user' }}); 

        res.json({ 
            'message': `Adminship cancelled of ${user.email}` 
        }); 
    } 
    catch (error) { 
        next(ErrorHandler.serverError()); 
    } 
} 

async function adminList(req, res, next) { 
    try { 
        const admins = await User.find({role: 'admin'}).select('email createdAt'); 
        res.json({ 
            admins
        }) 
    } 
    catch (err) { 
        next(ErrorHandler.serverError()); 
    } 
} 

async function allUserList(req, res, next) { 
    try { 
        const users = await User.find({role: 'user'}); 
        res.json({ users }); 
    } 
    catch (err) { 
        next(ErrorHandler.serverError()); 
    } 
} 

module.exports = { 
    registration, 
    login, 
    makeAdmin, 
    cancelAdmin, 
    adminList, 
    allUserList 
} 