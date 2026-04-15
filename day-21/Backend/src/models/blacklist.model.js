const mongoose=require("mongoose")

const blackListSchema= new mongoose.Schema({
    token:{
        type:"string",
        required:[true,"Token is required for blacklisting"],
        unique:true
    }
},{
    timestamps:true
})

const blacklistModel= mongoose.model("blacklist",blackListSchema)

module.exports= blacklistModel