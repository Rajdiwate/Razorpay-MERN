import { app } from "./app.js";
// import Razorpay from "razorpay";
import connectDb from './db/index.js'
import { Cashfree } from "cashfree-pg";


connectDb().then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log("listening on ", process.env.PORT);
    })

}).catch((error) => {
    console.log("Error while connection to db", error.message)
})



// export const instance = new Razorpay({

//     key_id: process.env.RAZORPAY_KEY,
//     key_secret: process.env.RAZORPAY_SECRET,

// })


export const getCashfreeDetails = function(){
    const env = Cashfree.Environment.PRODUCTION //process.env.PRODUCTION ? Cashfree.Environment.PRODUCTION :Cashfree.Environment.SANDBOX 

    return {clientId : process.env.CASHFREE_APP_ID,
            clientSecret : process.env.CASHFREE_SECRET,
            env
    }
}




