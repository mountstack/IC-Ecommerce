const express = require('express'); 
const validate = require('../middleware/passwordValidation'); 
const { registration, login, makeAdmin, cancelAdmin, adminList, allUserList } = require('../Controller/authController'); 
const { authenticate, accessTo } = require('../middleware/authentication'); 

const route = express.Router(); 

route.post('/signup', validate, registration); 
route.post('/signin', login); 

route.post('/makeAdmin', authenticate, accessTo(['super-admin']), makeAdmin); 
route.post('/cancelAdmin', authenticate, accessTo(['super-admin']), cancelAdmin); 
route.get('/admins', authenticate, accessTo(['admin', 'super-admin']), adminList); 
route.get('/users', allUserList); 

module.exports = route; 