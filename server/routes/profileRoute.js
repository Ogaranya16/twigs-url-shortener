const express = require('express');
const User = require('../models/Users');
const userController = require('../controller/userController');
const db = require('../models/db');

const router = express.Router();

const profileController = require('../controller/profileController');

router.get('/profile', profileController.getProfile);

router.post('/profile', profileController.updateProfile);

module.exports = router;