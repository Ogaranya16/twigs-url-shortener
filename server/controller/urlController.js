const Url = require('../models/urlShorts')
const mongoose = require('mongoose');
const User = require('../models/Users');
const userController = require('../controller/userController');
const express = require('express');
const utils = require('../utils/util');
const {validateUrl} = require('../utils/util');
const shortId = require('shortid')
const router = express.Router()
require('dotenv').config();


exports.createShortUrl = async (req, res, next) => {
    console.log(req.body);
    const origUrl = req.body.origUrl;
    const baseUrl = process.env.BASE_URL;

    //check base url
    const urlId = shortId.generate();
    if(utils.validateUrl(req.body.origUrl)){
        try{
            const url = await Url.find({origUrl});
            if(!url){
                res.status(401).json('Invalid original url')
            } else{
                console.log(origUrl)
                const shortUrl = `${baseUrl}/${urlId}`
                

                const url = new Url({
                    origUrl,
                    shortUrl,
                    urlId,
                    date: new Date() 
                })
                await url.save()
                res.status(200).json({
                    origUrl,
                    shortUrl,
                    urlId,
                    date: new Date()
                })
                console.log(req.body)
            }
        } catch(err){
            console.log(err)
            res.status(500).json('Server error')
        }
    }
}