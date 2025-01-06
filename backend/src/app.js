// import express from "express"
const express=require('express');
// import cors from "cors"
const cors=require('cors')
// import cookieParser from "cookie-parser"
const cookieParser=require('cookie-parser')
const userRouter=require('./routes/user.routes')
// import questionRouter from "./routes/question.route"
// import answerRouter from "./routes/answer.route"

// dotenv.config();

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

app.use("/api/users",userRouter)
// app.use("/api/questions",questionRouter)
// app.use("/api/answers",answerRouter)

module.exports= app