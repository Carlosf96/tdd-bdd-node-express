const express = require('express');
const router = express.Router();
const controller = require('../controllers/User.controller');

router.get('/', controller.getAllUsers);

module.exports = router;