const express = require('express'); 
const { authenticate, accessTo } = require('../middleware/authentication'); 
const { 
    getSingleOrder, 
    isPaidHandler, 
    statusHandler, 
    orderList, 
    individualCustomerOrder
} = require('../Controller/orderController'); 

const route = express.Router(); 

route.get('/', authenticate, accessTo(['admin', 'super-admin']), orderList); 
route.get('/:id', authenticate, getSingleOrder); 
route.get('/user/:userId', individualCustomerOrder); 
route.patch('/paid/:id', authenticate, isPaidHandler); 
route.patch('/status/:id', authenticate, accessTo(['admin', 'super-admin']), statusHandler); 

module.exports = route; 