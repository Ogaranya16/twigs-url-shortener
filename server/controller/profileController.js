const User = require('../models/Users');
const userController = require('../controller/userController');
const db = require('../models/db');
const express = require('express');
const router = express.Router();



exports.getProfile = (req, res, next) =>{
    User.find()
    .exec()
    .then(user =>{
        res.status(200).json(user)
    })
    .catch(err =>{
        console.log(err)
        res.status(500).send('/500')
    })

}

exports.updateProfile = (req, res, next) =>{
    User.updateOne({_id: req.params.id}, {$set: req.body})
    .exec()
    .then(result =>{
        res.status(200).json({
            message: 'User updated'
        })
    })
    .catch(err =>{
        console.log(err)
        res.status(500).send('/500')
    })
}

exports.deleteProfile = (req, res, next) =>{
    User.remove({_id: req.params.id})
    .exec()
    .then(result =>{
        res.status(200).json({
            message: 'User deleted'
        })
    })
    .catch(err =>{
        console.log(err)
        res.status(500).send('/500')
    })
}

exports.logout = (req, res, next) =>{
    req.session.destroy((err) =>{
        if(err) {
            return console.log(err)
        }
        res.redirect('/')
    })
}


