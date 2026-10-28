import express from 'express';
import authRouter from "./auth.route.js"
import userRouter from './user.route.js';
import postRouter from './post.route.js';

let router = express.Router();

router.use("/auth",authRouter);
router.use("/users",userRouter);
router.use("/posts",postRouter);

export default router;