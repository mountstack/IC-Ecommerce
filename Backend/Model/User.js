const bcrypt = require('bcryptjs'); 
const mongoose = require('mongoose'); 
const { Schema } = mongoose; 

const UserSchema = new Schema({
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'], 
        select: false
    },
    role: {
        type: String,
        enum: ["user", "admin", "super-admin"],
        default: "user",
    },
    orders: [
        { type: mongoose.Types.ObjectId, ref: 'Orders' }
    ] 
}, {
    timestamps: true
}); 

// RUN Only on login
UserSchema.methods.comparePassword = async (candidatePassword, userPassword) => {
    return await bcrypt.compare(candidatePassword, userPassword);
} 

const User = mongoose.model('User', UserSchema); 

module.exports = User; 