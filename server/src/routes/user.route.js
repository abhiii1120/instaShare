import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import { getMeController, updateProfile } from "../controllers/user.controller.js";

let router = Router();

router.get('/getMe',authMiddleware,asyncHandler(getMeController));
router.post("/update-user",authMiddleware,asyncHandler(updateProfile));

export default router;