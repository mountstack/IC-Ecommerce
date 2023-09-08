const User = require('../Model/User'); 
const Order = require('../Model/Order'); 
const ErrorHandler = require('../utills/ErrorHandler'); 

// order creates from the payment post method - payment.js 
async function createOrder(data, next) { 
    const { user, products, price, address } = data; 
    const order = new Order({ 
        user: user, 
        products: products, 
        status: 'pending', 
        price: price, 
        isPaid: false, 
        shippingAddress: address 
    }); 
    
    try { 
        const newOrder = await order.save(); 

        // await User.findByIdAndUpdate(user, { $set: { orders:  } }) 
        const userData = await User.findById(user); 
        userData.orders.push(newOrder._id); 
        await User.findByIdAndUpdate(user, { $set: { orders:  userData.orders} }) 
    } 
    catch(err) { 
        next(ErrorHandler.serverError('An error occured! Order is not placed! Try agin!')); 
    } 
} 

async function getSingleOrder(req, res, next) {
    const { id } = req.params; 

    try { 
        const order = await Order.findById(id).populate([ 
            { path: 'products.productId' },
            { path: 'user' } 
        ]); 
        res.json({ order }) 
    } catch (err) { 
        return next(ErrorHandler.serverError(err.message)); 
    } 
} 

module.exports = { 
    createOrder, 
    getSingleOrder
} 