import { Router } from 'express';
import { router as userRouter } from "./auth/auth.route"

export const router = Router();

router.use('/users', userRouter)