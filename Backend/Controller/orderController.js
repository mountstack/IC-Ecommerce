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

        return order._id; 
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

async function isPaidHandler(req, res, next) {
    try { 
        const { id } = req.params; 
        await Order.findByIdAndUpdate(id, { $set: { isPaid: true } }); 
        res.json({
            message: 'Order Created Successfully!'
        })
    } 
    catch (error) { 
        next(ErrorHandler.serverError()); 
    } 
} 

async function statusHandler(req, res, next) { 
    // status: ['pending', 'picked', 'delivered'], 
    const { status } = req.body; 
    try { 
        const { id } = req.params; 
        await Order.findByIdAndUpdate(id, { $set: { status } }); 
        res.json({
            message: 'Status Updated Successfully!'
        })
    } 
    catch (error) { 
        next(ErrorHandler.serverError()); 
    } 
} 


module.exports = { 
    createOrder, 
    getSingleOrder, 
    isPaidHandler, 
    statusHandler
} 