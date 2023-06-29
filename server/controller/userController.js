const User = require('../models/Users');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const db = require('../models/db');



//register page
exports.createUser =  (req, res, next) =>{
     console.log(req.body);
    User.find({userName: req.body.userName})
    .exec()
    .then(user => {
        if(user.length >= 1){
            return res.status(422).json({
                message: "Username not available"
            })
        } else {
              console.log(req.body);
              const salt = bcrypt.genSalt(10);
              const hashedPass = bcrypt.hash(req.body.password, 10, (err, hashedPass) =>{
              console.log(hashedPass);
              if(err) {
                    return res.status(500).json({
                       error: err
                    })
                } else{
                     const user = new User ({
                        _id: new mongoose.Types.ObjectId(),
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        userName: req.body.userName,
                        email: req.body.email,
                        password: hashedPass
                    })
                      console.log(user);
                    user.save()
                    .then( result =>{
                        console.log(user);
                        res.status(201).json({
                            message: 'User created',
                            user: user,
                        });

                       
                    })
                    .catch(err =>{
                        return  res.status(500).json({
                            error: err
                        
                        })
                    })
                }
            })
        }
    })
}

// //login
// exports.loginUser = (req, res) =>{
//     User.find({userName: req.body.userName})
//     .exec()
//     .then(user =>{
//         if(user.length < 1) {
//             return res.status(401).json({
//                 message: 'Invalid username or password'
//             })
//         }
//         bcrypt.compare(req.body.password, user[0].password, (err, result) =>{
//             if(err) {
//                 return res.staus(401).json({
//                     message: "invalid username or password"
//                 })
//             } 
//             if(result) {
//                 const token = jwt.sign({
//                     userName: user[0].userName,
//                     userId: user[0]._id, 
//                 },process.env.JWT_KEY,
//                 {
//                     expiresIn: '1h'
//                 })
//                 return res.status(200).json({
//                     userName: req.body.userName,
//                     token: token
//                 })
//             }  
//         })
//     })
//     .catch(err =>{
//         console.log(err)
//         res.status(500).json({
//             error: err
//         })
//     })
// }