var express = require('express');
var router = express.Router();

var auth = require('./auth.js');
var apiCommands = require('./apiCommands.js');

/*
 * Routes that can be accessed by any one
 */

//Log in and get a token
router.post('/login', auth.login);
//Register and create token
router.post('/register', auth.register);


/*
 * Routes that can be accessed only by autheticated users
 */
router.post('/api/getInt', apiCommands.getInt);
router.post('/api/setInt', apiCommands.setInt);



module.exports = router;
