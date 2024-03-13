const mongoose=require('mongoose')

const loginSchema=new mongoose.Schema({
     firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})
const loginModel = mongoose.model('loginModel',loginSchema)
module.exports=loginModel;