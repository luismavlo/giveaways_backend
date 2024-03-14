import axios from "axios";
import { prisma } from "../config/database/postgres";
import { envs } from "../config/enviroments/enviroment";
import { IParticipantReq } from "./interfaces/participant.interface";
import { DiscordUserRes, GetParticipantsQueries, TokenRes, WhereQueries } from "./interfaces";
import qs from 'querystring';


export class ParticipantService {

    static async getAllParticipants(queries: GetParticipantsQueries) {
        const where: WhereQueries = {}
        const { offset, limit, discordId, giveawayId, name } = queries;
        if (discordId) where.discordId = discordId;
        if (giveawayId) where.giveawayId = giveawayId;
        if (name) where.name = name;
        return prisma.participant.findMany({ 
            where, 
            skip: offset,
            take: limit
        });
    }

    static async createParticipant(data: IParticipantReq) {
        const url = 'https://discord.com/api/v10';

        const { code, fullname, giveawayId } = data;

        const body = {
            grant_type: 'authorization_code',
            client_id: envs.DISCORD_CLIENT_ID,
            client_secret: envs.DISCORD_CLIENT_SECRET,
            redirect_uri: envs.DISCORD_REDIRECT_URI,
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
                fullname: fullname,
                giveawayId: giveawayId,
                discordId: discordUser.id,
                email: discordUser.email,
            }
        });
    }

}
