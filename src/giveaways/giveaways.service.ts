import { Prisma } from "@prisma/client";
import { prisma } from "../config/database/postgres";
import { GiveawayBody } from "./interfaces";
import { GiveawayQueries } from "./interfaces/giveaway-queries.interface";

export class GiveawayService {

    static async getAllGiveaways(queries: GiveawayQueries) {

        const where: Prisma.GiveawayWhereInput = {};
        const { offset, limit, finished, pendings, title, status } = queries;
        if (title) where.title = { contains: title, mode: 'insensitive' };
        if (finished) where.giveawayDate = { lte: new Date() }
        if (pendings) where.giveawayDate = { gte: new Date() }
        if (status) where.status = status;

        const results = await prisma.giveaway.findMany({
            where,
            skip: offset && +offset,
            take: limit && +limit,
            orderBy: { createdAt: 'desc' },
        });
        const total = await prisma.giveaway.count({ where });
        return { total, results }
    }

    static async createGiveaway(data: GiveawayBody) {
        return prisma.giveaway.create({ data });
    }

    static async getGiveawayById(giveawayId: number) {
        return prisma.giveaway.findUniqueOrThrow({
            where: { giveawayId },
        })
    }

    static async updateGiveaway(data: GiveawayBody, giveawayId: number) {
        return prisma.giveaway.update({ data, where: { giveawayId } });
    }

    static async getGiveawayWinners(giveawayId: number) {
        return prisma.prize.findMany({
            where: { giveawayId },
            include: { winner: true },
        });
    }

    static async generateGiveawayWinners(giveawayId: number) {
        const prizes = await prisma.prize.findMany({ where: { giveawayId } });
        const participants = await prisma.participant.findMany({ where: { giveawayId }});

        const participantsIds = participants.map(p => p.participantId);
        const winnersIds = this.generateRandomNumbers(participantsIds, prizes.length);

        const updates = winnersIds.map((winnerId, i) => {
            return prisma.prize.update({
                where: { prizeId: prizes[i].prizeId },
                data: { winnerId },
            })
        })
        await prisma.$transaction(updates);

        return this.getGiveawayWinners(giveawayId);
    }

    private static generateRandomNumbers(numbers: number[], quantity: number) {
        const ranNums = [];
    
        let j = 0;
    
        while (quantity--) {
            j = Math.floor(Math.random() * (numbers.length));
            ranNums.push(numbers[j]);
            numbers.splice(j, 1);
        }
        return ranNums;
    }
}
