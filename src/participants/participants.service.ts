import axios from "axios";
import { prisma } from "../config/database/postgres";
import { envs } from "../config/enviroments/enviroment";
import { IParticipantReq } from "./interfaces/participant.interface";
import { DiscordUserRes, GetParticipantsQueries, TokenRes } from "./interfaces";
import qs from 'querystring';
import { Prisma } from "@prisma/client";


export class ParticipantService {

    static async getAllParticipants(queries: GetParticipantsQueries) {
        const where: Prisma.ParticipantWhereInput = {}
        const { offset, limit, discordId, giveawayId, fullname } = queries;
        if (discordId) where.discordId = { contains: discordId, mode: 'insensitive' };
        if (giveawayId) where.giveawayId = +giveawayId;
        if (fullname) where.fullname = { contains: fullname, mode: 'insensitive' };
        const results = await prisma.participant.findMany({ 
            where, 
            skip: offset && +offset,
            take: limit && +limit
        });
        const total = await prisma.participant.count({ where });
        return { total, results }
    }

    static async createParticipant(data: IParticipantReq) {
        const url = 'https://discord.com/api/v10';

        const { code, redirectUri, giveawayId } = data;

        const body = {
            grant_type: 'authorization_code',
            client_id: envs.DISCORD_CLIENT_ID,
            client_secret: envs.DISCORD_CLIENT_SECRET,
            redirect_uri: redirectUri,
            code: code
        }

        // obtener token de usuario
        const { data: { access_token } } = await axios.post<TokenRes>(
            url + '/oauth2/token',
            qs.stringify(body), {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

        const bearerHeader = {
            headers: { 'Authorization': `Bearer ${access_token}` }
        }

        // verificar que el usuario esté en devtalles
        await axios.get(`${url}/users/@me/guilds/1130900724499365958/member`, bearerHeader);

        const { data: discordUser } = await axios.get<DiscordUserRes>(`${url}/users/@me`, bearerHeader);
        return prisma.participant.create({
            data: {
                fullname: discordUser.global_name,
                giveawayId: giveawayId,
                discordId: discordUser.id,
                email: discordUser.email,
            },
            include: {
                giveaway: { select: {title: true}}
            }
        });
    }

    static async getOneParticipant(participantId: number) {
        return prisma.participant.findUniqueOrThrow({ where: { participantId }});
    }

    static async deleteParticipant(participantId: number) {
        await prisma.participant.delete({ where: { participantId } });
    }

}
