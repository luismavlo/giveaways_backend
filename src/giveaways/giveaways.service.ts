import { prisma } from "../config/database/postgres";
import { GiveawayBody } from "./interfaces";

export class GiveawayService {

    static async getAllGiveaways() {

        // TODO: Manejar queries
        const results = await prisma.giveaway.findMany({
            
        });
        const total = await prisma.giveaway.count();
        return {total, results}
    }

    static async createGiveaway(data: GiveawayBody) {
        return prisma.giveaway.create({ data });
    }
}