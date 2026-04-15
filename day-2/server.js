const express=require("express")
const { log } = require("node:console")

const app=express()

app.get('/',(req,res)=>{
    res.send("Hello world")
})

app.get('/about',(req,res)=>{
    res.send("About page")
})

app.get('/home',(req,res)=>{
    res.send("Home page")
})

app.listen(3000,()=>{
    log('the server is running on port 3000')
})
