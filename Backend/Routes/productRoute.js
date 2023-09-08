const express = require('express'); 
const { authenticate, accessTo } = require('../middleware/authentication'); 
const { 
    create, 
    findAll, 
    findSingle, 
    update
} = require('../Controller/productController'); 

const route = express.Router(); 

route.post('/', authenticate, accessTo(['admin', 'super-admin']), create); 
route.get('/', findAll); 
route.get('/:id', findSingle); 
route.patch('/:id', authenticate, accessTo(['super-admin']), update); 
route.delete('/:id', authenticate, accessTo(['super-admin']), () => {}); 

module.exports = route; 