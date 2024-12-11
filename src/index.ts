import { v2 as cloudinary } from 'cloudinary';
import express, {Request, Response} from "express"
import cors from "cors"
import mongoose from "mongoose"
import "dotenv/config"
import myUserRoute from './routes/MyUserRoutes'
import myRestaurantRoute from './routes/MyRestaurantRoute'
import restaurantRoute from './routes/RestaurantRoute'
import orderRoute from './routes/OrderRoutes'

const PORT = process.env.PORT || 8000;
mongoose.connect(process.env.DATABASE_URL as string).then(()=>{
    console.log("connected to database")
})

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET  
});


const app = express()
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use("/api/order/checkout/webhook", express.raw({type: "*/*"})) // this for stripe webhook 
app.use(express.json()) // this need to be here


app.get("/health", (req:Request, res:Response)=>{
    res.send({message: "Health ok!"})
})

app.use("/api/my/user",myUserRoute)
app.use("/api/my/restaurant", myRestaurantRoute)
app.use("/api/restaurant",restaurantRoute)
app.use("/api/order",orderRoute)

app.listen(PORT,()=>{
    console.log("Server Started")
})