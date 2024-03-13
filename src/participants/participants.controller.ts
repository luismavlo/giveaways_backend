import { NextFunction, Request, Response } from "express";
import { AppError, catchAsync } from "../errors";
import { prisma } from "../config/database/postgres";
import axios, { AxiosError } from 'axios';
import qs from 'querystring';
import { DiscordUserRes, TokenRes } from "./responses";
import { envs } from "../config/enviroments/enviroment";

export const getAllParticipants = catchAsync(async (req: Request, res: Response) => {
    const participants = await prisma.participant.findMany();
    return res.json(participants);
})

export const createParticipant = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { code, fullname, giveawayId } = req.body;
        const url = 'https://discord.com/api/v10';
    
        const data = {
            grant_type: 'authorization_code',
            client_id: envs.DISCORD_CLIENT_ID,
            client_secret: envs.DISCORD_CLIENT_SECRET,
            redirect_uri: envs.DISCORD_REDIRECT_URI,
            code
        }
    
        // obtener token de usuario
        const { data: { access_token } } = await axios.post<TokenRes>(
            url + '/oauth2/token', 
            qs.stringify(data), {
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        });

        const bearerHeader = {
            headers: { 'Authorization': `Bearer ${access_token}` }
        }

        // verificar que el usuario esté en devtalles
        await axios.get(`${url}/users/@me/guilds/1130900724499365958/member`, bearerHeader);

        const { data: discordUser } = await axios.get<DiscordUserRes>(`${url}/users/@me`, bearerHeader);

        const user = {
            fullname, 
            giveawayId,
            discordId: discordUser.id,
            email: discordUser.email,
        }

        // prisma.participant.create({data: {
        //     fullname, 
        //     discordId: discordUser.id,
        //     email: discordUser.email,
        //     giveawayId
        // }});
    
        return res.status(201).json(user);
      
});
