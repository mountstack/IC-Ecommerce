const mongoose = require('mongoose');
const { Schema } = mongoose; 

const product = new Schema({
    title: {
        type: 'string', required: [true, 'Title is required']
    },
    description: {
        type: 'string', required: [true, 'Description is required']
    },
    image: { 
        type: 'string', required: [true, 'Image is required'] 
    },
    price: { 
        type: Number, required: [true, 'Price is required'] 
    }, 
    reviews: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Review'
    }] 
}, { 
    timestamps: true
});

const Product = mongoose.model("Product", product);

module.exports = Product;