const express=require('express')
const userModel=require('../model/user.model')
const jwt=require('jsonwebtoken')
const usermodel = require('../model/user.model')
const authRouter=express.Router()
const crypto=require('crypto')


authRouter.post("/register",async (req,res)=>{

    const {name,email,password}=req.body
    const isUserExisted= await userModel.findOne({email})

    if(isUserExisted){
       return res.status(400).json({
            message:"user already existed with this email"
        })
    }

    const hash= crypto.createHash("md5").update(password).digest("hex")
   const user= await userModel.create({
        name,email,password:hash 
    })

    const token=jwt.sign(
        {
            id:user._id,
            email:user.email
         },
         process.env.JWT_SECRET
        )

        res.cookie("jwt-token",token)

        res.status(201).json({
            message:"user is created",
            user,
            token
        })

})


authRouter.post('/protected',(req,res)=>{
    console.log(req.cookies);

    res.status(200).json({
        message:"this is a protrctrd route"
    })
    
})


authRouter.post('/login', async (req,res)=>{
    const {email,password}=req.body
    const user= await userModel.findOne({email})

    if(!user){
       return res.status(404).json({
            message:"this email does not existed"
        })
    }
    const isPassword= user.password===crypto.createHash("md5").update(password).digest("hex")

    if(!isPassword){
         return res.status(401).json({
            message:"Invalid password"
        })
    }
    const token=jwt.sign(
        {
        id:user._id,
    },
    process.env.JWT_SECRET
     )
     res.cookie("jwt_token",token)

     res.status(200).json({
        message:"user logged in",
        user
     })
})


module.exports=authRouter