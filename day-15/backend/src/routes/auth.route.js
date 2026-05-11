const express=require('express')
const authController=require('../controllers/auth.controller')
const identifyUser= require("../middlewares/auth.middleware")

const authRouter=express.Router()

authRouter.post('/register',authController.registerController)

authRouter.post('/login',authController.loginController)

authRouter.get('/get-me', authController.getmeController)

authRouter.post('/logout', authController.logoutController)
authRouter.delete('/delete-account', identifyUser, authController.deleteUserController)

module.exports=authRouter