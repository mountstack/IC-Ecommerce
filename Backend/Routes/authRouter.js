const express = require('express'); 
const validate = require('../middleware/passwordValidation'); 
const { registration, login, makeAdmin, cancelAdmin, adminList } = require('../Controller/authController'); 
const { authenticate, accessTo } = require('../middleware/authentication'); 

const route = express.Router(); 

route.post('/signup', validate, registration); 
route.post('/signin', login); 

route.post('/makeAdmin', authenticate, accessTo(['super-admin']), makeAdmin); 
route.post('/cancelAdmin', authenticate, accessTo(['super-admin']), cancelAdmin); 
route.get('/admins', authenticate, accessTo(['admin', 'super-admin']), adminList); 

module.exports = route; 