export interface GiveawayUpdate {
    title?:             string;
    description?:       string;
    giveawayDate?:      string;
    participantsLimit?: number;
    status?:            'ACTIVE' | 'DELETED';
    // image
}
