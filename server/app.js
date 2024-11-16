import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'

export const app = express()

dotenv.config()

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true
}))

app.use(express.json({limit : '30mb' , extended : true})) 
app.use(express.urlencoded({limit: '30mb' , extended: true}))
app.use(cookieParser())

app.listen(process.env.PORT || 8000 , ()=>{
    console.log("Listening on port " , process.env.PORT)
})


