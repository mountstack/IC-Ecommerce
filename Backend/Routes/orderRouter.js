const express = require('express'); 
const { authenticate, accessTo } = require('../middleware/authentication'); 
const { getSingleOrder } = require('../Controller/orderController'); 

const route = express.Router(); 

route.get('/:id', getSingleOrder); 
// route.patch('/:id', authenticate, accessTo(['super-admin']), () => {}); 
// route.delete('/:id', authenticate, accessTo(['super-admin']), () => {}); 

module.exports = route; 