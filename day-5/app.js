const express=require('express')

const app=express()

const notes=[]

app.use(express.json())

app.post('/notes',(req,res)=>{
    notes.push(req.body)
    res.status(201).json({
        message:"note is created suucessfully"
    })
})


app.get('/notes',(req,res)=>{
    res.status(200).json({
        note:notes
    })
})

app.delete('/notes/:index',(req,res)=>{
    delete notes[req.params.index]
    res.status(204).json({
        message:"note is deleted"
    })
})


app.patch('/notes/:index',(req,res)=>{
    notes[req.params.index].description=req.body.description
    res.status(200).json({
        message:"note is updated"
    })
})

module.exports=app