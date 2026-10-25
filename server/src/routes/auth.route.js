import express from 'express';
import { forgotPasswordController, loginController, refreshTokenController, registerController } from '../controllers/auth.controller.js';
import { asyncHandler } from '../middlewares/asyncHandler.js';

const router = express.Router();

router.post('/register',asyncHandler(registerController));
router.post("/login",asyncHandler(loginController));
router.post("/refresh-token",asyncHandler(refreshTokenController));
router.post("/forgot-password",asyncHandler(forgotPasswordController));

export default router;