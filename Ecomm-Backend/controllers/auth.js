const {validationResult} = require('express-validator')
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.postSignup = (req,res,next)=>{
    const email = req.body.email
    const password = req.body.password
    const confrimpassword = req.body.confrimpassword
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).send({error:errors.array()[0].msg})
    }
    bcrypt.hash(password,12)
    .then(hashedpassword=>{
        const user = new User({
            email:email,
            password:hashedpassword,
            orders:[],
            admin: false
        })
        return user.save()
    })
    .then(res.status(201).send('user created'))
    .catch(err=>res.send({error:err}))
}


exports.postLogin = (req,res,next)=>{
    const email = req.body.email
    const password = req.body.password
    const errors = validationResult(req)
    let loadedUser
    if(!errors.isEmpty()){
        return res.status(422).send({error: errors.array()[0].msg})
    }
    return User.findOne({email:email})
    .then(user=>{
        if(!user){   
            res.status(401)
            return Promise.reject('Email Not Found!')
        }
        loadedUser = user
        return  bcrypt.compare(password,user.password)
    })
    .then(doMatch=>{
        if(!doMatch){
            return res.status(401).send({error:'Wrong Password'})
        }
        //generating token with payload data and secret key with some expiration time
        const token = jwt.sign({
            email: loadedUser.email,
            userId: loadedUser._id
        },'anysecretkey',
        { expiresIn: '1h' }   //user will not Authenticated based on token after expiration time
        )
        return res.status(200).send({token: token, userId: loadedUser._id.toString()})
    }
    )
    .catch(e=>{
        return res.send({error:e})
    })
}