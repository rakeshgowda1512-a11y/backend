const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    user:String,
    email:{
        type:String,
        unique:[true,"This email already existed"]
    },
    password:String
})

const usermodel=mongoose.model("user",userSchema)

module.exports=usermodel