import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import errorMiddleware from "./middleware/error.middleware.js";
import razorpay from './routes/razorpay.routes.js'
import userRoutes from './routes/user.routes.js'
import cookieParser from 'cookie-parser'

export const app = express()

dotenv.config()

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(cookieParser())
app.use(express.json({limit : '30mb' , extended : true})) 
app.use(express.urlencoded({limit: '30mb' , extended: true}))
app.use(cookieParser())

app.use('/api' , razorpay)
app.use('/api' , userRoutes)

app.use(errorMiddleware)

