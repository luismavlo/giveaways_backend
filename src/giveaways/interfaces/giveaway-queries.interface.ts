export interface GiveawayQueries {
    offset?:   number;
    limit?:    number;
    title?:    string;
    pendings?: boolean;
    finished?: boolean;
    status?:   'ACTIVE' | 'DELETED'
}
