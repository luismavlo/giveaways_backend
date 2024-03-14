import z from 'zod';

import { extractValidationData } from "../common/utils/extractValidationData";
import { GiveawayBody } from './interfaces';

export const giveawaySchema = z.object({
    title: z.string(),
    description: z.string(),
    giveawayDate: z.string().datetime(),
    participantsLimit: z.number(),
    prize: z.string()
});

export function validateGiveaway(data: GiveawayBody){
  const result = giveawaySchema.safeParse(data);

  const { hasError, errorMessages, data: giveawayData } = extractValidationData(result);

  return { hasError, errorMessages, giveawayData }
}
