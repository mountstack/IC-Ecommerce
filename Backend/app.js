const express = require('express'); 
const mongoose = require('mongoose'); 
const cors = require('cors'); 
require('dotenv').config(); 

const ErrorHandler = require('./utills/ErrorHandler'); 
const authRoute = require('./Routes/authRouter'); 
const productRoute = require('./Routes/productRoute'); 
const reviewRoute = require('./Routes/reviewRoute'); 
const orderRoute = require('./Routes/orderRouter'); 
const payNow = require('./Controller/payment'); 

const app = express(); 
app.use(cors()); 
app.use(express.json()); 

app.get('/', (req, res) => {
    res.json({
        message: 'App is running'
    })
}) 
app.use('/api/auth', authRoute); 
app.use('/api/product', productRoute); 
app.use('/api/review', reviewRoute); 
app.use('/api/order', orderRoute); 

app.post('/api/payment', payNow); 


// Page not found 
app.use((req, res, next) => { 
    next(ErrorHandler.notFound()); 
}) 

// Express Error Handling Middleware
app.use((err, req, res, next) => { 
    res.status(err.status).json({
        status: err.status, 
        error: err.message 
    }) 
}) 

const PORT = process.env.PORT || 5000; 

app.listen(PORT, () => { 
    console.log(`App is live on ${PORT}`); 
    mongoose.connect( 
        'mongodb://localhost:27017/ic-ecommerce', 
        {  useNewUrlParser: true } 
    ) 
        .then(() => { 
            console.log('Database Connected'); 
        }) 
        .catch(err => { 
            console.log(err); 
        }) 
}); 