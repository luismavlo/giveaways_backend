export interface Giveaway {
    giveawayId:        number;
    title:             string;
    description:       string;
    giveawayDate:      string;
    image:             string;
    participantsLimit: number;
    createdAt:         string;
    status:            'ACTIVE' | 'DELETED';
}
