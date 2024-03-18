
export interface IParticipantReq {
    redirectUri:   string;
    giveawayId: number;
    code:       string;
}

export interface IParticipantRes {
    participantId?: number;
    fullname:       string;
    giveawayId:     number;
    discordId:      string;
    email:          string;
}
