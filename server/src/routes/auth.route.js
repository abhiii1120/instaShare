import express from 'express';
import { loginController, refreshTokenController, registerController } from '../controllers/auth.controller.js';
import { asyncHandler } from '../middlewares/asyncHandler.js';

const router = express.Router();

router.post('/register',asyncHandler(registerController));
router.post("/login",asyncHandler(loginController));
router.post("/refresh-token",asyncHandler(refreshTokenController));

export default router;