const express = require('express');
const router = express.Router();
const authController = require('./auth.controller');

router.get('/verify', authController.verify);

module.exports = router;