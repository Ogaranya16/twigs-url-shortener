const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error'));

db.once('open', () =>{
    console.log('MongoDB connected');
})

module.exports = db;

require('./Users');