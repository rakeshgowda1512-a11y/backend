const user= require("../models/user.model")
const jwt=require('jsonwebtoken')
const blacklistModel=require('../models/blacklist.model')
const redis=require("../config/cache")


async function authUser(req,res,next){

    const token=req.cookies.token

    if(!token){
        return res.status(401).json({
            message:"token not provided"
        })
    }

    const isBlacklist= await redis.get(token)

    if(isBlacklist){
        return res.status(401).json({
            message:"Invalid token"
        })
    }


    try{
  const decoded=  jwt.verify(
        token,
        process.env.JWT_SECRET
    )

    req.user=decoded

    next()

    }
    catch(err){
         return res.status(401).json({
             message: "Invalid token"
         })
     }

}

module.exports={authUser}