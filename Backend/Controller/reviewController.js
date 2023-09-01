
const Review = require('../Model/Review'); 
const Product = require('../Model/Product'); 
const ErrorHandler = require('../utills/ErrorHandler'); 

async function create(req, res, next) { 
    try {
        req.body.user = req.user._id; 
        const { user, body, rating, productId } = req.body; 

        const review = new Review({user, body, rating}); 

        await review.save(); 

        const product = await Product.findById(productId); 
        product?.reviews?.push(review._id); 

        await Product.findByIdAndUpdate({_id: productId}, product, { new: true }); 

        res.json({
            message: 'Review created successfully'
        }); 
    } catch (err) { 
        next(ErrorHandler.serverError()); 
    } 
} 

module.exports = create; 