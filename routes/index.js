var express = require('express');
var router = express.Router();

var auth = require('./auth.js');
var products = require('./products.js');
var user = require('./users.js');

/*
 * Routes that can be accessed by any one
 */

//Log in and get a token
router.post('/login', auth.login);
//Register and create token
router.post('/register', auth.login);


/*
 * Routes that can be accessed only by autheticated users
 */
router.get('/api/getInt', products.getInt);
router.post('/api/setInt', products.setInt);



module.exports = router;
