const express = require('express');
const mongoose = require('mongoose')
const Url = require('../models/urlShorts');
const User = require('../models/Users')
require('dotenv').config();
const shortId = require('shortid');
const utils = require('../utils/util')
const urlController = require('../controller/urlController')
const userController = require('../controller/userController');
const app = express()

const router = express.Router();


router.post('/', urlController.createShortUrl);

//app.use(express.urlencoded({extended: false}))

//shorten url
// router.post('/urlShorts', async(req, res) =>{
//     console.log(req.body)
//     const {origUrl} = req.body;
//     const baseUrl = process.env.BASE_URL;

//     //check base url
//     if(utils.validateUrl(origUrl)){
//         try{
//             const url = await Url.findOne({origUrl});
//             if(url){
//                 res.json(url)
//             } else{
//                 const shortUrl = `${baseUrl}/${shortId.generate()}`

//                 const url = new Url({
//                     origUrl,
//                     shortUrl,
//                     date: new Date()
//                 })
//                 await url.save()
//                 res.json(url)
//             }
//         } catch(err){
//             console.log(err)
//             res.status(500).json('Server error')
//         }
//     } else{
//         res.status(401).json('Invalid original url')
//     }

// });

//shorten url
// router.post('/urlShorts', async(req, res) =>{
//     const origUrl = req.body.origUrl;
//     const baseUrl = process.env.BASE_URL;

//     //check base url
//     if(utils.validateUrl(origUrl)){
//         try{
//             const url = await Url.findOne({origUrl});
//             if(url){
//                 res.json(url)
//             } else{
//                 const shortUrl = `${baseUrl}/${shortId.generate()}`

//                 const url = new Url({
//                     origUrl,
//                     shortUrl,
//                     date: new Date()
//                 })
//                 await url.save()
//                 res.json(url)
//             }
//         } catch(err){
//             console.log(err)
//             res.status(500).json('Server error')
//         }
//     } else{
//         res.status(401).json('Invalid original url')
//     }
// })

//generate qr code
// router.get('/qrCode', async(req, res) =>{
//     try{
//         const url = await Url.findOne({urlId: req.params.urlId});
//         if(url == null) return res.sendStatus(404).json('Url not found');

//         const qrCode = await utils.generateQRCode(url.shortUrl);
//         res.type('png');
//         qrCode.pipe(res);
//     } catch(err){
//         console.log(err)
//         res.status(500).json({
//             message: 'Server error'
//         })
//     }
// })

//redirect to original url
router.get('/redirect', async(req, res) =>{
    try{
       const url = await Url.findOne({urlId: req.params.urlId});
       if(url == null) return res.sendStatus(404).json('Url not found');

        url.clicks++;
        url.save();

        res.redirect(url.origUrl);
    } catch(err){
        console.log(err)
        res.status(500).json({
            message: 'Server error'
        })
    }
});

module.exports = router;    