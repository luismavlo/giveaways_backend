import z from 'zod';

import { extractValidationData } from "../common/utils/extractValidationData";
import { GiveawayBody } from './interfaces';
import { GiveawayUpdate } from './interfaces/giveaway-update.interface';

export const giveawaySchema = z.object({
    title: z.string(),
    description: z.string(),
    giveawayDate: z.string().datetime(),
    participantsLimit: z.union([z.string().regex(/^-?(0|[1-9]\d*)$/), z.number()]),
});

export function validateGiveaway(data: GiveawayBody){
  const result = giveawaySchema.safeParse(data);

  const { hasError, errorMessages, data: giveawayData } = extractValidationData(result);

  return { hasError, errorMessages, giveawayData }
}

export const updateGiveawaySchema = giveawaySchema.partial();

export function validateUpdateGiveaway(data: GiveawayUpdate){
  const result = giveawaySchema.safeParse(data);

  const { hasError, errorMessages, data: giveawayData } = extractValidationData(result);

  return { hasError, errorMessages, giveawayData }
}
