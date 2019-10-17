const express = require('express');
const router = express.Router();
const csrf = require("csurf");

// require controllers
const userController = require('../controllers/userController');
var csrfProtection = csrf({ cookie: true });

router.get('/login', csrfProtection, userController.xrsfToken);
router.post('/login', csrf({ cookie: true, ignoreMethods: ['POST']}), userController.xrsfToken);

router.post('/authenticate', csrfProtection, userController.authenticate);

router.post('/register', csrfProtection, userController.register);

router.get('/current', userController.currentUser);


module.exports = router;