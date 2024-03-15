import { Router } from 'express';
import { router as userRouter } from "./auth/auth.route"
import { router as participantRouter } from "./participants/participants.route";
import { router as giveawayRouter } from "./giveaways/giveaways.route";
import { router as prizeRouter } from "./prizes/prizes.route";
import { router as seedRouter } from "./seeds/seed.route";

export const router = Router();

router.use('/users', userRouter)
router.use('/participants', participantRouter);
router.use('/giveaways', giveawayRouter);
router.use('/prizes', prizeRouter);
router.use('/seeds', seedRouter);
