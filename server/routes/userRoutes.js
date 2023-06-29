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
            return res.status(401).send('/401')
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) =>{
            if(err) {
                return res.staus(401).json({
                    message: "invalid username or password"
                })
            } 
            if(result) {
                const token = jwt.sign({
                    userName: user[0].userName,
                    userId: user[0]._id, 
                },process.env.JWT_KEY,
                {
                    expiresIn: '1h'
                })
                return res.status(200).json({
                    userName: req.body.userName,
                    token: token
                })
                // res.redirect('/dashboard')

            }
            if(req.body.userName === userName && req.body.password === 'admin') {
                session = req.session;
                session.user_id = req.body.userName;
                console.log(req.session)
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