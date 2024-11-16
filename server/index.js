import { app } from "./app.js";
import errorMiddleware from "./middleware/error.middleware.js";

import razorpay from './routes/razorpay.routes.js'
import Razorpay from "razorpay";



export const instance = new Razorpay({

    key_id: process.env.RAZORPAY_KEY,
    key_secret: process.env.RAZORPAY_SECRET,
})



app.use('/api' , razorpay)

app.use(errorMiddleware)

