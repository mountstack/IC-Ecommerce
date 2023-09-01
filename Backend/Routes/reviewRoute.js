const express = require('express'); 
const { authenticate } = require('../middleware/authentication'); 
const create = require('../Controller/reviewController'); 

const route = express.Router(); 

route.post('/', authenticate, create); 

module.exports = route; 