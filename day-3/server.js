const express=require('express')
const { log } = require('node:console')

const app=express()

const notes=[]

app.use(express.json())

app.post('/notes',(req,res)=>{
    res.send('note is created')
    notes.push(req.body)
})

app.get('/notes',(req,res)=>{
    res.send(notes)
})

app.listen(3000,()=>{
    log('server is running on port 3000')
})