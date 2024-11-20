import { Cashfree } from "cashfree-pg"
import { ApiError } from "../utils/apiError.js"
import crypto from 'crypto'
import { getCashfreeDetails } from "../index.js"
import { Payment } from "../models/payment.model.js"



const generateCfOrderId = () => {
  const uniqueId = crypto.randomBytes(16).toString('hex')
  const hash = crypto.createHash('sha256')
  hash.update(uniqueId)

  return hash.digest('hex').substring(0, 12)
}

const createCfSession = async (req, res, next) => {
  try {

    var request = {
      order_amount: req.body.amount,
      order_currency: "INR",
      order_id: generateCfOrderId(),
      customer_details: {
        customer_id: req.user._id,
        customer_name: req.user.name,
        customer_email: req.user.email,
        customer_phone: req.body.number
      },
      order_meta: {
        return_url: `${req.headers.origin}/paymentsuccess`
      }
    }

    const config = getCashfreeDetails()
    Cashfree.XClientId = config.clientId
    Cashfree.XClientSecret = config.clientSecret
    Cashfree.XEnvironment = config.env



    Cashfree.PGCreateOrder("2025-01-01", request).then((response) => {
      res.status(201).json({ success: true, session: response.data })
    }).catch((error) => {
      console.error('Error setting up order request:', error.response.data);
      res.status(400).json({ success: false })

    })

  } catch (error) {
    return next(new ApiError(error.message, 500))
  }

}

const verifyCfPayment = async (req,res,next) => {
  try {
    const config = getCashfreeDetails()
    Cashfree.XClientId = config.clientId
    Cashfree.XClientSecret = config.clientSecret
    Cashfree.XEnvironment = config.env

    Cashfree.PGOrderFetchPayments("2025-01-01", req.body.order_id).then( async(response) => {
      console.log("response" , response)

    await Payment.create({user : req.user._id  , order_id : response.data[0].order_id , payment_id : response.data[0].cf_payment_id })
    res.status(201).json({ success: true, data : res.data[0] })

    }).catch((err) => {
      res.status(404).json({ success: false, error: err.message })
    })
  } catch (error) {
    return next(new ApiError(error.message, 500))
  }
}

export { createCfSession, verifyCfPayment }