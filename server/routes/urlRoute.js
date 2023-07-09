const express = require('express');
const mongoose = require('mongoose')
const Url = require('../models/urlShorts');
const User = require('../models/Users')
require('dotenv').config();
const shortId = require('shortid');
const utils = require('../utils/util')
const urlController = require('../controller/urlController')
const userController = require('../controller/userController');
const qr = require('qrcode');
const validateUrl = require('../utils/util');
const { route } = require('./profileRoute');
const app = express()

const router = express.Router();


router
        


// router.post('/shortUrls',async (req, res, next) => {
//     console.log(req.body);
//     const origUrl = req.body.origUrl;
//     const baseUrl = process.env.BASE_URL;

//     //check base url
//     const urlId = shortId.generate();
//     if(utils.validateUrl(req.body.origUrl)){
//         try{
//             const url = await Url.find({origUrl});
//             if(!url){
//                 res.status(401).json('Invalid original url')
//             } else{
//                 console.log(origUrl)
//                 const shortUrl = `${urlId}`
                

//                 const url = new Url({
//                     origUrl,
//                     shortUrl,
//                     urlId,
//                     date: new Date() 
//                 })
//                 await url.save()
//                 .then((url) => {
//                     console.log(url)
//                     res.status(200).json(url)
//                     req.session.message = {
//                        type: 'success',
//                        message: 'Url shortened successfully'
//                     }   
//                     res.redirect('/profile')
//                 })
//             }
//         } catch(err){
//             console.log(err)
//             res.status(500).json('Server error')
//         }
//     }
// })

router.post('/scan', async(req, res) =>{
    const shortUrl = req.body.shortUrl;
    
    if(shortUrl.length === 0) res.send('Empty data')

    try{
        qr.toDataURL(shortUrl, (err, src) =>{
            if(err) res.send('Error occured')

            res.send('scan', {src})
        })
    } catch(err){
        console.log(err)
        res.status(500).json('Server error')
    }

})




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


module.exports = router;    