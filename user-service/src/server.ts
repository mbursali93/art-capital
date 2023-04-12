import express from "express"
import dotenv from "dotenv"

dotenv.config()

import cookieParser from "cookie-parser"
import MessageQueue from "./utils/message-broker"
import Database from "./database/db"

import authRouter from "./routes/auth-route"
import userRouter from "./routes/user-route"




const app = express()
const database = new Database()
const message = new MessageQueue()

app.use(express.json())
app.use(cookieParser(process.env.COOKIE_SECRET))


app.use("/auth", authRouter)
app.use("/users", userRouter)


database.connect()
message.handlePaymentRequests()


const PORT = process.env.USER_SERVICE_PORT || 7001



app.listen(7001, ()=> console.log(`user-service is running on PORT: ${PORT}`))


export default app;