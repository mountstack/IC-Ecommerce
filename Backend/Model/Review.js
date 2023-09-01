const mongoose = require('mongoose'); 
const { Schema } = mongoose; 

const ReviewSchema = new Schema({
    body: { 
        type:String, required: [true, 'Review text is required']
    },
    rating: {
        type: Number, required: [true, 'Rating is required']
    },
    user: { 
        type: mongoose.SchemaTypes.ObjectId, ref: 'User'
    }
}, { 
    timestamps: true
}); 

const Review = mongoose.model('Review', ReviewSchema); 

module.exports = Review; 