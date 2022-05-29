const express = require('express')

const {check,body} = require('express-validator')

const User = require('../models/user')

const router = express.Router()

const authController = require('../controllers/auth')

router.put('/signup',
        [body('email').isEmail()
        .withMessage('Please enter a valid email')
        .normalizeEmail()
        .custom((value,{req})=>{
            return User.findOne({email:value}).then(userDoc=>{
                if(userDoc){
                    return Promise.reject('Email already Exist')
                }
            })
        }),
        body('password')
        .trim()
        .isLength({min:5})
        .withMessage('Please enter atleast 5 characters'),
        body('confirmpass')
        .trim()
        .custom((value,{req})=>{
            if(value!==req.body.confirmpass){
                throw new Error('password are not matched')
            }
            return true
        })
        ],
        authController.postSignup)

router.put('/login',check('email').isEmail().withMessage('Please enter a valid email'),authController.postLogin)

module.exports = router



