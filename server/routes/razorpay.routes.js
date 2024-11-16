import { Router } from "express";
import { createOrder , verifyPayment } from "../controllers/razorpay.controller.js";

const router = Router()

router.route('/create-order').post(createOrder)

router.route('/paymentverification').post(verifyPayment)


export default router