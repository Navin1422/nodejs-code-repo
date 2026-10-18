import express from 'express';
import { register , signup } from '../controllers/authController.js';

const router = express.Router();

router.get("/register", register);
router.get("/signup", signup);

export default router;