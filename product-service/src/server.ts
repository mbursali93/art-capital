import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
dotenv.config()

import productRoutes from "./routes/product-routes"
import MessageQueue from "./utils/message-broker"


const app = express()
const message = new MessageQueue()
message.handleIncomingMessages("product")

app.use(express.json())

app.use("/products", productRoutes)

mongoose.connect(process.env.MONGO_URL ? process.env.MONGO_URL : "")
.then(()=> console.log("database connection is successful"))
.catch(e=> console.log(e.message))



const PORT = process.env.PRODUCT_PORT || 7002
app.listen(PORT, ()=> console.log(`product-service is running on PORT: ${PORT}`))

export default app;