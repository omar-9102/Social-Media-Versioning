const express = require('express');
const router = express.Router();
const userController = require('./user.controller');
const {authenticate} = require('../../Middlewares/Authenticate')

router.post('/register', userController.register);
router.get('/get', userController.getUsers);
router.post('/login', userController.login)
router.get('/getCountedPosts',authenticate, userController.getUserCountedPosts)

module.exports = router;