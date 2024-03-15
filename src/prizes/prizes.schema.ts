import z from 'zod';

import { extractValidationData } from "../common/utils/extractValidationData";
import { PrizeBody } from './interfaces/prize-body.interface';

export const prizeSchema = z.object({
  name: z.string(),
  giveawayId: z.union([z.string().regex(/^-?(0|[1-9]\d*)$/), z.number()]),
  quantity: z.union([z.string().regex(/^([1-9]\d*)$/), z.number().positive()])
});

export function validatePrize(data: PrizeBody) {
  const result = prizeSchema.safeParse(data);

  const { hasError, errorMessages, data: prizeData } = extractValidationData(result);

  return { hasError, errorMessages, prizeData }
}
