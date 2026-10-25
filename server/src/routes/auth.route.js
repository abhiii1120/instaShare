import express from 'express';
import { loginController, registerController } from '../controllers/auth.controller.js';
import { asyncHandler } from '../middlewares/asyncHandler.js';

const router = express.Router();

router.post('/register',asyncHandler(registerController));
router.post("/login",asyncHandler(loginController));

export default router;