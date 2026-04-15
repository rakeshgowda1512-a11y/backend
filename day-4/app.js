const express=require('express')

const app=express()

const notes=[]

app.use(express.json())

app.post('/notes',(req,res)=>{

    notes.push(req.body)
    res.send('note is created')
})

app.get('/notes',(req,res)=>{
    res.send(notes)
})

app.delete('/notes/:index',(req,res)=>{
    delete notes[req.params.index]
    res.send('note is deleted')
})

app.patch('/notes/:index',(req,res)=>{
    notes[req.params.index].description=req.body.description

    res.send('note is updated')
})

module.exports=app