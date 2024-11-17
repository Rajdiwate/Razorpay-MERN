import { app } from "./app.js";
import Razorpay from "razorpay";
import connectDb from './db/index.js'




connectDb().then(()=>{
    app.listen(process.env.PORT || 8000 , ()=>{
        console.log("listening on " , process.env.PORT);
    })

}).catch((error )=>{
    console.log("Error while connection to db" , error.message)
}) 



export const instance = new Razorpay({

    key_id: process.env.RAZORPAY_KEY,
    key_secret: process.env.RAZORPAY_SECRET,
})




