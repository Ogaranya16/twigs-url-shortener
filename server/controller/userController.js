const User = require('../models/Users');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const db = require('../models/db');



//register page
// exports.createUser =  async (req, res, next) =>{  
//     const user = new User({
//         _id: new mongoose.Types.ObjectId(),
//         userName: req.body.userName,
//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//         password: req.body.password,
//         email: req.body.email
//     });
//     try {
//         const newUser = await user.save()
//         .then (result => {
//             console.log(result);
//             req.session.message = {
//                 type: 'success',
//                 message: 'Account created successfully'
//             }
//             res.redirect('/login')
//         })
//     } catch (err) {
//         res.status(500).json({
//             message: err.message
//         })
//     }
// }
    
        
exports.createUser = async(req, res) =>{
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        userName: req.body.userName,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
    });
    try {
        const newUser = await user.save()
        .then(result => {
            console.log(result);
            req.session.message = {
                type: 'success',
                message: 'Sign up Successful'
            }
        })
        res.redirect('/login');
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

