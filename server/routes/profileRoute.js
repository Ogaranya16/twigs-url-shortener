const express = require('express');
const User = require('../models/Users');
const Url = require('../models/urlShorts');
const userController = require('../controller/userController');
const db = require('../models/db');

const router = express.Router();

const profileController = require('../controller/profileController');

router.get('/profile', (req, res) => {
    res.render('profile', {title: 'Profile'})
})


router.post('/profile', profileController.createProfile);

module.exports = router;