import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()

import paymentRouter from "./routes/payment-routes"


const app = express()

app.use(express.json())
app.use(cors({
    origin: ["http://localhost:7003", "http://localhost:3000"],
}))

app.use("/payment", paymentRouter)


mongoose.connect(process.env.MONGO_URL || "").then(
    ()=> console.log("database connection is successful")
).catch((e)=> console.log(e.message))

const PORT = process.env.PAYMENT_PORT || 7003
app.listen(PORT, ()=> console.log(`payment-service is running on PORT: ${PORT}`))