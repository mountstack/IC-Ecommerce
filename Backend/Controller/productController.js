const Product = require('../Model/Product'); 
const ErrorHandler = require('../utills/ErrorHandler'); 

const create = async (req, res, next) => { 
    const product = new Product(req.body); 
    product.save() 
        .then((data) => { 
            res.json({ 
                message: 'Created successfully', 
                data 
            }) 
        }) 
        .catch(err => { 
            return next(ErrorHandler.serverError(err.message)); 
        }) 
} 

async function findAll(req, res, next) {
    try {
        const products = await Product.find(); 
        res.json({
            products
        }) 
    } catch (err) {
        return next(ErrorHandler.serverError(err.message)); 
    }
} 

async function findSingle(req, res, next) { 
    const { id } = req.params; 

    try { 
        const product = await Product.findById(id).populate([
            {path: 'reviews'},
            {path: 'reviews', populate: { path: 'user' }}
        ]); 
        res.json({
            product
        }) 
    } catch (err) {
        return next(ErrorHandler.serverError(err.message)); 
    } 
} 

async function update(req, res, next) { 
    const { id } = req.params; 

    try { 
        const product = await Product.findByIdAndUpdate(id, { $set: req.body }, {new: true});
        res.json({ 
            product, 
            message: 'Updated Successfully'
        }); 
    } 
    catch (err) { 
        next(ErrorHandler.serverError()); 
    } 
} 



module.exports = {
    create, 
    findAll, 
    findSingle, 
    update
}