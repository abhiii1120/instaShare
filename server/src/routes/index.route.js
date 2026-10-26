import express from 'express';
import authRouter from "./auth.route.js"
import userRouter from './user.route.js';

let router = express.Router();

router.use("/auth",authRouter);
router.use("/users",userRouter)

export default router;