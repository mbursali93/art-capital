import express from "express"
import dotenv from "dotenv"


dotenv.config()

const app = express()
app.use(express.json())




const PORT = process.env.USER_SERVICE_PORT || 7001


app.listen(PORT, ()=> console.log(`User service is running on PORT: ${PORT}`))