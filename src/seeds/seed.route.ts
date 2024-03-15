import { Request, Response, Router } from "express";
import { prisma } from "../config/database/postgres";
import { giveawaysSeed } from "./giveaways-seed";
import { participantsSeed } from "./participants-seed";
import { prizesSeed } from "./prizes-seed";
import { catchAsync } from "../errors";
import { usersSeed } from "./users-seed";

export const router = Router();

router.post('/', catchAsync(async (req: Request, res: Response) => {
    await prisma.participant.deleteMany();
    await prisma.prize.deleteMany();
    await prisma.giveaway.deleteMany();
    await prisma.user.deleteMany();

    await prisma.user.createMany({ data: usersSeed });
    await prisma.giveaway.createMany({data: giveawaysSeed});
    await prisma.participant.createMany({data: participantsSeed});
    await prisma.prize.createMany({data: prizesSeed});

    return res.json({
        message: 'seeds executed successfully',
    })
}));
