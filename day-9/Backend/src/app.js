

const express=require('express')
const noteModel = require('./models/notes.model')
const cors=require('cors')
const path=require('path')

const app=express()

app.use(express.json())
app.use(cors())
app.use(express.static("./public"))

app.post('/api/notes',async (req,res)=>{
    const {title,description}= req.body

    const note= await noteModel.create({
        title,description
    })

    res.status(201).json({
        message:'note created succesfully',
        note
    })
})

app.get('/api/notes',async (req,res)=>{
    const notes= await noteModel.find()

    res.status(200).json({
        message:"notes fetched successfully",
        notes
    })
})

app.delete('/api/notes/:id',async (req,res)=>{
    const id = req.params.id
    await noteModel.findByIdAndDelete(id)
    res.status(204).json({
        message:"note is deleted successfully"
    })
    
})

app.patch('/api/notes/:id',async (req,res)=>{
    const id =req.params.id
    const {title, description}=req.body
    await noteModel.findByIdAndUpdate(id,{title,description})
    res.status(200).json({
        message:"note is updated successfully"
    })
})


app.use('*name',(req,res)=>{
    res.sendFile(path.join(__dirname,"..","Public/assets/index.html"))
})
module.exports=app