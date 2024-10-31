import express, {Request, Response} from "express"
import cors from "cors"
import mongoose from "mongoose"
import "dotenv/config"
import myUserRoute from './routes/MyUserRoutes'

mongoose.connect(process.env.DATABASE_URL as string).then(()=>{
    console.log("connected to database")
})

const app = express()
app.use(express.json())
app.use(cors())

app.use("/health", (req:Request, res: Response)=>{
    res.send({message: "Health ok!"})
})
app.use("/api/my/user",myUserRoute)

app.listen(8000,()=>{
    console.log("Server Started")
})