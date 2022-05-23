const express = require('express')
const bodyParser = require('body-parser')
const mongoConnect = require('./util/database')
const mongoose = require('mongoose')
const shopRoute = require('./routes/shop')

const app = express()

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use((req,res,next)=>{
    //for removing CORS error for having different ports
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Access-Control-Allow-Methods','OPTIONS,GET,POST,PUT,PATCH,DELETE')
    res.setHeader('Access-Control-Allow-Headers','Content-type, Authorization')
    next()
})

app.use(shopRoute)

//if database connection success then only start the server thats y passed callback
mongoose.connect('mongodb+srv://bhautik:iKVxMr1hfuEz6StK@cluster0.l0p55.mongodb.net/shop?retryWrites=true&w=majority')
.then(result=>{
    app.listen(5000)
}).catch(err=>console.log(err))

