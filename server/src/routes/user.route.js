import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import { getMeController } from "../controllers/user.controller.js";

let router = Router();

router.get('/getMe',authMiddleware,asyncHandler(getMeController));

export default router;