const express = require('express'); 
const { authenticate, accessTo } = require('../middleware/authentication'); 
const { getSingleOrder, isPaidHandler, statusHandler } = require('../Controller/orderController'); 

const route = express.Router(); 

route.get('/:id', authenticate, getSingleOrder); 
route.patch('/paid/:id', authenticate, isPaidHandler); 
route.patch('/status/:id', authenticate, accessTo(['admin', 'super-admin']), statusHandler); 

module.exports = route; 