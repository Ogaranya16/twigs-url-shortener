const Url = require('../models/urlShorts')
const mongoose = require('mongoose');
const User = require('../models/Users');
const userController = require('../controller/userController');
const express = require('express');
const utils = require('../utils/util');
const {validateUrl} = require('../utils/util');
const qr = require('qrcode');
const shortId = require('shortid')
const router = express.Router()




//redirect to original url
router.get('/:shortUrl', async(req, res) =>{
    const url = await Url.findOne({shortUrl: req.params.shortUrl})
    if(url == null) return res.sendStatus(404)  

    url.clicks++
    shortUrl.save()

    res.redirect(url.origUrl);
})