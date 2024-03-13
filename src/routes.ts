import { Router } from 'express';
import { router as userRouter } from "./auth/auth.route"
import { router as participantRouter } from "./participants/participants.route";

export const router = Router();

router.use('/users', userRouter)
router.use('/participants', participantRouter);
