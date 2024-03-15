import { Prisma } from "@prisma/client";
import { prisma } from "../config/database/postgres";
import { CreatePrize, Prize, UpdatePrize } from "./interfaces";

export class PrizeService {

    static async getAllPrizes(giveawayId: number) {
        const query = Prisma.sql`
            SELECT
                name,
                image,
                "giveawayId",
                CAST(COUNT(*) AS INTEGER) as quantity
            FROM
                "Prize"
            WHERE
                "giveawayId" = ${giveawayId}
            GROUP BY
                name, image, "giveawayId"
        `;

        const prizes = await prisma.$queryRaw(query);

        return prizes;
    }

    static async createPrize(data: CreatePrize, quantity: number) {
        // Crea los premios de acuerdo a la cantidad
        const prizesData = Array<Prize>(quantity).fill(data);
        await prisma.prize.createMany({ data: prizesData });
        // para retornarlas, toca findMany ya que createMany no retorna
        const prize = await prisma.prize.findFirst({
            where: {
                name: data.name,
                giveawayId: data.giveawayId
            }
        });
        return { ...prize, quantity }
    }

    static async updatePrize(data: UpdatePrize, name: string, giveawayId: number) {
        await prisma.prize.updateMany({ data, where: { name, giveawayId }});
        const prize = await prisma.prize.findFirst({
            where: {
                name: data.name,
                giveawayId: giveawayId
            }
        });
        return prize;
    }

    static async deletePrize(name: string, giveawayId: number) {
        await prisma.prize.deleteMany({ where: { name, giveawayId }});
    }
}
