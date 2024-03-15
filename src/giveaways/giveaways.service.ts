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
        return {total, results}
    }

    static async createGiveaway(data: GiveawayBody) {
        return prisma.giveaway.create({ data });
    }

    static async getGiveawayById(giveawayId: number) {
        return prisma.giveaway.findUniqueOrThrow({
            where: {giveawayId},
        })
    }

    static async updateGiveaway(data: GiveawayBody, giveawayId: number) {
        return prisma.giveaway.update({data, where: { giveawayId }});
    }

    static async getGiveawayWinners(giveawayId: number) {
        return prisma.prize.findMany({
            where: { giveawayId },
            include: { winner: true },
        });
    }
}
