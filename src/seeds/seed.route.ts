import { Request, Response, Router } from "express";
import { prisma } from "../config/database/postgres";
import { giveawaysSeed } from "./giveaways-seed";
import { participantsSeed } from "./participants-seed";
import { prizesSeed } from "./prizes-seed";
import { catchAsync } from "../errors";
import { createUsersSeed } from "./users-seed";
import { protect } from "../auth/auth.middleware.js";

export const router = Router();

router.post('/', protect, catchAsync(async (req: Request, res: Response) => {
    await prisma.participant.deleteMany();
    await prisma.prize.deleteMany();
    await prisma.giveaway.deleteMany();
    await prisma.user.deleteMany();

    const usersSeed = await createUsersSeed();

    await prisma.user.createMany({ data: usersSeed });
    await prisma.giveaway.createMany({data: giveawaysSeed});
    await prisma.participant.createMany({data: participantsSeed});
    await prisma.prize.createMany({data: prizesSeed});

    return res.json({
        message: 'seeds executed successfully',
    })
}));
