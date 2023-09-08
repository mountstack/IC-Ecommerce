const mongoose = require('mongoose'); 
const { Schema } = mongoose; 

const OrderSchema = new Schema({ 
    user: { 
        type: mongoose.Types.ObjectId, 
        ref: 'User' 
    }, 
    products: [{ 
        productId: { type: mongoose.Types.ObjectId, ref: 'Product' }, 
        quantity: Number 
    }], 
    status: { 
        type: String, 
        enum: ['pending', 'picked', 'delivered'], 
        default: 'pending' 
    }, 
    price: { type: Number, required: true }, 
    isPaid: { type: Boolean, required: true }, 
    shippingAddress: { type: String, required: true }, 
    cashOnDelivery: { type: Boolean, default: false } 
}, { 
    timestamps: true 
}); 

const Order = mongoose.model('Order', OrderSchema); 

module.exports = Order; 