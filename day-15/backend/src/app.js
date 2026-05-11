const express=require('express')
const cookieparser=require('cookie-parser')
const cors = require('cors')
const path = require('path')

const app=express()


app.use(express.json())
app.use(cookieparser())
app.use(cors({
    origin: [process.env.FRONTEND_URL, "http://localhost:5173", "http://localhost:5174"].filter(Boolean),
    credentials:true,
}))

const authRouter=require('./routes/auth.route')
const postRouter=require('./routes/post.route')
const userRouter=require('./routes/user.route')


app.use("/api/posts",postRouter)
app.use("/api/auth",authRouter)
app.use("/api/users",userRouter)

app.get("/ping", (req, res) => res.status(200).send("pong"))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../public')))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/index.html'))
    })
}

module.exports=app