import { instance } from "../index.js"
import crypto from 'crypto'

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
        
        //check if payment is valid
        //use sha256 algo on paymentId + order_id. It should be equal to signature
        const generated_signature = crypto.createHmac('sha256' , process.env.RAZORPAY_SECRET )
                                    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
                                    .digest('hex')


        console.log(generated_signature)
        console.log(razorpay_signature)
        if(generated_signature === razorpay_signature ){
            //save details in database
            // console.log(req)
            res.redirect(`${req.headers.origin}/paymentsuccess`)
            // res.status(200).json({success:true})
        }
        else{
            return res.status(400).json({success:false , message : "payment unsuccessfull"})
        }

        
    } catch (error) {
        return next(new Error(error.message , 500))
    }
}

export {createOrder , verifyPayment}