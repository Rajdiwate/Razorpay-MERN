import { instance } from "../index.js"
import crypto from 'crypto'
import { Payment } from "../models/payment.model.js"
import { ApiError } from "../utils/apiError.js"

const createOrder = async(req,res,next)=>{
   try {
    const options = {
        amount : req.body.amount * 100,
        currency : "INR"
    }
     const order = await instance.orders.create(options)
     return res.status(201).json({success :true , order})
   } catch (error) {
    return next(new Error(error.message , 500))
   }
}

const verifyPayment = async(req,res,next)=>{
    try {
        const {razorpay_payment_id , razorpay_order_id , razorpay_signature} = req.body
        if(!razorpay_payment_id || !razorpay_order_id || !razorpay_signature ) return next(new ApiError("not complete details" , 400))
        
        //check if payment is valid
        //use sha256 algo on paymentId + order_id. It should be equal to signature
        const generated_signature = crypto.createHmac('sha256' , process.env.RAZORPAY_SECRET )
                                    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
                                    .digest('hex')


        console.log(generated_signature)
        console.log(razorpay_signature)
        if(generated_signature !== razorpay_signature ){
            return next(new ApiError("invalid credentials" , 400)) 
        }
        
        const payment = await Payment.create({user : req.user._id  , ...req.body})
        if(!payment) return next(new ApiError("error while creating payment" ,400))

        res.redirect(`${req.headers.origin}/paymentsuccess`)
        
    } catch (error) {
        return next(new Error(error.message , 500))
    }
}

export {createOrder , verifyPayment}