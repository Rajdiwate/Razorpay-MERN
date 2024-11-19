import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import errorMiddleware from "./middleware/error.middleware.js";
import razorpay from './routes/razorpay.routes.js'
import userRoutes from './routes/user.routes.js'
import cashFreeRoutes from "./routes/cashfree.routes.js"
import cookieParser from 'cookie-parser'

export const app = express()

dotenv.config()

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true,
}))
app.use(cookieParser())
app.use(express.json({limit : '30mb' , extended : true})) 
app.use(express.urlencoded({limit: '30mb' , extended: true}))

app.use('/api' , razorpay)
app.use('/api' , userRoutes)
app.use('/api' ,cashFreeRoutes )

app.use(errorMiddleware)

