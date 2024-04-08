import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import mongoose from "mongoose"
import router from "./routers/user-routes.js"
import eventRouter from "./routers/event-routes.js"
 
const app = express()
dotenv.config()

// Middleware
app.use(cors());
app.use(express.json())

// Routes
app.use("/api/user",router);
app.use("/api/event", eventRouter)

const connect = async ()=> {
    try{
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to mongoDB")
    } catch (error) {
        throw error
    }
} 

// mongoose.connection.on("disconnected", () => {
//     console.log("Disconnected mongoDB Atlas");
// })

// mongoose.connection.on("connected", () => {
//     console.log("Connected mongoDB Atlas");
// })

app.listen(8000, ()=> {
    connect() 
    console.log("Connected to Backend")
})