const express = require('express');
const router = express.Router();
const userController = require('./user.controller');

router.post('/register', userController.register);
router.get('/get', userController.getUsers);
router.post('/login', userController.login)

module.exports = router;