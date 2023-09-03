const express = require('express'); 
const mongoose = require('mongoose'); 

const ErrorHandler = require('./utills/ErrorHandler'); 
const authRoute = require('./Routes/authRouter'); 
const productRoute = require('./Routes/productRoute');
const reviewRoute = require('./Routes/reviewRoute');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'App is running'
    })
}) 

app.use('/api/auth', authRoute); 
app.use('/api/product', productRoute); 
app.use('/api/review', reviewRoute); 
// app.use('/api/order', reviewRoute); 

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

app.listen(5000, () => { 
    console.log(`App is live on 5000`); 
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