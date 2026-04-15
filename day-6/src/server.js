
const app=require('./app')

const mongoose=require('mongoose')

function connect(){
    mongoose.connect("mongodb+srv://Rakesh:SWlruTQewfnuQTQz@cluster0.rnbgyoj.mongodb.net/day-6")
    .then(()=>{
        console.log("connected to database");
    })
}

connect();
app.listen(3000,()=>{
    console.log('server is running on port 3000');
    
})