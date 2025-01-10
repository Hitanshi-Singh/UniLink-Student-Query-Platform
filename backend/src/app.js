const express=require('express');
const cors=require('cors')
const cookieParser=require('cookie-parser')
const userRouter=require('./routes/user.routes')
const questionRouter=require('./routes/question.route')
const answerRouter=require('./routes/answer.route')

const app = express();
// app.options('*', cors()); 
app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'], 
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

app.use("/api/users",userRouter)
app.use("/api/questions",questionRouter)
app.use("/api/answers",answerRouter)

module.exports= app;