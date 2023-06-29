const mongoose = require('mongoose');
const shortId = require('shortid');
const {validateUrl} = require('../utils/util');
const utils = require('../utils/util');
const qr = require('qrcode');


const UrlSchema = new mongoose.Schema({
    urlId:{
        type: String,
        required: true,
    },
    origUrl:{
        type: String, 
        required: true,
    },
    shortUrl: {
        type: String,
        required: true,
        default: shortId.generate
    },
    clicks: {
        type: Number,
        required: true,
        default: 0
    },
    date:{
        type: String,
        default: Date.now
    }
})

module.exports = mongoose.model('Url', UrlSchema);