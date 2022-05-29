const {validationResult} = require('express-validator')
const User = require('../models/user')
const bcrypt = require('bcryptjs')

exports.postSignup = (req,res,next)=>{
    const email = req.body.email
    const password = req.body.password
    const confrimpassword = req.body.confrimpassword
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).send(errors.array()[0].msg)
    }
    bcrypt.hash(password,12)
    .then(hashedpassword=>{
        const user = new User({
            email:email,
            password:hashedpassword,
            orders:[]
        })
        return user.save()
    })
    .then(res.status(201).send('user created'))
    .catch(err=>res.send(err))
}


exports.postLogin = (req,res,next)=>{
    const email = req.body.email
    const password = req.body.password
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).send(errors.array()[0].msg)
    }
    User.findOne({email:email})
    .then(user=>{
        if(!user){
            return res.send('user not Exist')
        }
        bcrypt.compare(password,user.password)
        .then(doMatch=>{
            if(doMatch){
                return res.send('Login Succesfull')
            }
            return res.send('Incorrect password')
        }
        ).catch(e=>{
            return res.send(e)
        })
    })
}