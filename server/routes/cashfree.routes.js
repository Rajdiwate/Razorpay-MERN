import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { createCfSession, verifyCfPayment } from "../controllers/cashfree.controller.js";

const router = Router()

router.route('/cf/create-session').post(verifyJWT , createCfSession)

router.route('/cf/verifyPayment').post(verifyJWT , verifyCfPayment)

export default router