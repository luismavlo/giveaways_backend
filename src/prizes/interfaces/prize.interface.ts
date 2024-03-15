export interface Prize {
    prizeId?:   number;
    name:       string;
    image:      string;
    winnerId?:  number | null;
    giveawayId: number;
}
