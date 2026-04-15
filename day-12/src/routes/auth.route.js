const express=require('express')
const userModel=require('../models/user.model')
const jwt=require('jsonwebtoken')
const authRouter=express.Router()


authRouter.post("/register",async(req,res)=>{
    const {name ,email,password}=req.body
    
    const isUserExisted= await userModel.findOne({ email })

    if(isUserExisted){
        return res.status(400).json({
            message:"user already existed with this emaail "
        })
    }

    const user= await userModel.create({
        name,email,password
    })

    const token= jwt.sign(
        {
            id:user._id,
            email:user.email
        },
        process.env.JWT_SECRET
    )

    res.cookie("jwt_token",token)
    
    res.status(201).json({
        message:'user is registered',
        user,
        token
    })
})




module.exports= authRouter