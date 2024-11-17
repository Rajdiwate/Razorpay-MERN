import { Router } from "express";
import { getCurrentUser, loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();
router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').get(verifyJWT , logoutUser)
router.route('/user/me').get(verifyJWT , getCurrentUser)

export default router
