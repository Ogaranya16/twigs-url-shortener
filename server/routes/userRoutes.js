const express = require('express');
const mongoose = require('mongoose')

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userController = require('../controller/userController');
const User = require('../models/Users');

const router = express.Router();


router.post('/', userController.createUser)
//login

// router.get('/login', (req, res) =>{
//     res.render('login')
// })

router.post('/login', (req, res, next) =>{
    User.find({userName: req.body.userName})
    .exec()
    .then(user =>{
        if(user.length < 1) {
            req.session.message = {
                type: 'danger',
                message: "invalid username or password"
            }
            res.redirect('/login')
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) =>{
            if(err) {
                return res.staus(401).json({
                    message: "invalid username or password"
                })
            } 
            if(result) {
               req.session.message = {
                     type: 'success',
                        message: 'Login successful'
               }
                res.redirect('/profile')
            }
            else {
                res.redirect('/login')
            }
        })
    })
    .catch(err =>{
        console.log(err)
        res.status(500).send('/500')
    })
})

module.exports = router;