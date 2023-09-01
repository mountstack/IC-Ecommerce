const mongoose = require('mongoose'); 
const { Schema } = mongoose; 

const OrderSchema = new Schema({ 
    price: { 
        type: Number, required: true
    },
    products: [{
        type: mongoose.Types.ObjectId, ref: 'Product'
    }],
    status: {
        type: String, 
        enum: ['pending', 'picked', 'delivered'], 
        default: 'pending'
    }, 
    shippingAddress: { 
        type: String, required: true
    }, 
    user: { 
        type: mongoose.Types.ObjectId, 
        ref: 'User' 
    } 
}, { 
    timestamps: true
}); 

const Order = mongoose.model('Order', OrderSchema); 

module.exports = Order; 