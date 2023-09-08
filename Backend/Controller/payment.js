
const SSLCommerzPayment = require('sslcommerz-lts'); 
const ErrorHandler = require('../utills/ErrorHandler'); 
const orderController = require('./orderController'); 

const storeId = process.env.STORE_ID; 
const storePassword = process.env.STORE_PASSWORD;
const isLive = false; // true for live, false for sandbox 

function payNow(req, res, next) { 
    const { products, name, postCode, currency = 'BDT', address, phone, price } = req.body; 
    
    const data = { 
        total_amount: price, // product.price 
        currency: currency,
        tran_id: `${Date.now()}`, // use unique tran_id for each api call
        success_url: 'http://localhost:3000/success',
        fail_url: 'http://localhost:3000/fail',
        cancel_url: 'http://localhost:3000/cancel',
        ipn_url: 'http://localhost:3000/ipn',
        shipping_method: 'Courier',
        product_name: 'products',
        product_category: 'Course',
        product_profile: 'general',
        cus_name: name,
        cus_email: 'customer@example.com',
        cus_add1: address,
        cus_add2: 'Dhaka',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: postCode,
        cus_country: 'Bangladesh',
        cus_phone: phone,
        cus_fax: '01711111111',
        ship_name: 'Customer Name',
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
    }; 
    try { 
        const sslcz = new SSLCommerzPayment(storeId, storePassword, isLive); 
        sslcz.init(data) 
            .then(async apiResponse => { 
                let GatewayPageURL = apiResponse.GatewayPageURL; 
                
                let dataObj = { 
                    user: req.body.user, 
                    products: products, 
                    price: price, 
                    address: address 
                }; 
                await orderController.createOrder(dataObj, next); 

                
                res.status(200).json({ url: GatewayPageURL }); 
            }); 
    } 
    catch (error) { 
        next(ErrorHandler.serverError()); 
    } 
} 

module.exports = payNow; 