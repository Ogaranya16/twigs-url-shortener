const mongoose = require('mongoose');
require('dotenv').config();
const validator = require('validator'); 


const UsersSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    userName: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
        minLength: 8,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: {validator: validator.isEmail, message: 'Invalid email.'}
    },
    firstName:{
        type: String,
        required: true,
    },
    lastName:{
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Users', UsersSchema);