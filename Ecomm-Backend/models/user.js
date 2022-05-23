const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    cart:{
        items:[{
            productId:{type:Schema.Types.ObjectId,ref:'Product',required:true},
            quantity:{type:String,required:true}
        }]
    }
})

module.exports = mongoose.model('User',UserSchema)