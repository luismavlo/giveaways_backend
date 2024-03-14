export interface GetParticipantsQueries {
    giveawayId?: number;
    limit?: number;
    offset?: number;
    name?: string;
    discordId?: string;
}

export interface WhereQueries {
    giveawayId?: number;
    name?: string;
    discordId?: string;
}
