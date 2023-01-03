const express = require('express')
const Register = require('../models/RegisterSchema')
const user_router = express.Router()
const bodyparser = require('body-parser')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
// const secrete = "AUTH"
const { body, validationResult } = require('express-validator')
// const e = require('express')

user_router.use(bodyparser.json())

user_router.post('/api/v1/register', async (req, res) => {
    try {
        // body('email').isEmail()
        // body('password').isLength({ min: 4, max: 10 })
        const { email, password, confirm_password } = req.body
        console.log(email)
        console.log(password)
        console.log(confirm_password)
        
        const user = await Register.findOne({ email: email })
        // console.log(user)
        // console.log(user)
        if (!user) {
            if (password !== confirm_password) {
                
                console.log("Hello")
                res.json({
                    status: "Failed",
                    result: "Password doesn't match",
                })
            } else {
                bcrypt.hash(password, 10, async function (err, hash) {
                    if (err) {
                        res.json({
                            status: "Failed",
                            result: err.messagge
                        })
                    } else {
                        const user = await Register.create({
                            email: email,
                            password: hash
                        })
                        res.json({
                            status: "succes",
                            user
                        })
                    }
                })
            }
        } else {
            res.json({
                status: "Failed",
                result: "User Already exists",
            })
        }
    } catch (e) {
        res.json({
            status: "Failed",
            result: e.message
        })
    }
})

user_router.post('/api/v1/login', async (req, res) => {
    try {
        // const { email, password } = req.body
        // console.log(req.body)
        const user = await Register.findOne({ email: req.body.email })
        // console.log(user)
        if (user) {
            const result =  bcrypt.compare(req.body.password, user.password)
            // console.log(result)
            if (result) {
                const token = jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + 60 * 60,
                    data: user._id,

                }, "AUTH")
                res.status(200).json({
                    Status: "Success",
                    // result:user,
                    token,
                });
                // res.status(401).json({
                //     Status: "failed",
                //     // result:user,
                //     message: "Wrong password"
                // });
            }
            else {
                // const token = jwt.sign({
                //     exp: Math.floor(Date.now() / 1000) + 60 * 60,
                //     data: user._id,

                // }, "AUTH")
                // res.status(200).json({
                //     Status: "Success",
                //     // result:user,
                //     token,
                // });

                res.status(401).json({
                    Status: "failed",
                    // result:user,
                    message: "Wrong password"
                });
            }


        } else {
            res.status(404).json({
                Status: "Failed",
                result: "User Doesn't exist"
            });
        }
    } catch (e) {
        res.status(404).json({
            Status: "Failed",
            result: e.message
        });
    }
})

module.exports = user_router