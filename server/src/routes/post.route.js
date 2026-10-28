import express from 'express';
import { upload } from '../config/multer.config.js';
import {authMiddleware} from "../middlewares/auth.middleware.js";
import {createPost} from "../controllers/post.controller.js";

const router = express.Router();

router.post("/create",authMiddleware,upload.array("images"),createPost);

export default router;