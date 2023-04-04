import express from "express"
import dotenv from "dotenv"

dotenv.config()

import cookieParser from "cookie-parser"

import Database from "./database/db"

import authRouter from "./routes/auth-route"




const app = express()
const database = new Database()

app.use(express.json())
app.use(cookieParser(process.env.COOKIE_SECRET))


app.use("/auth", authRouter)


 database.connect()



const PORT = process.env.USER_SERVICE_PORT || 7001



app.listen(0, ()=> console.log(`User service is running on PORT: ${PORT}`))


export default app;