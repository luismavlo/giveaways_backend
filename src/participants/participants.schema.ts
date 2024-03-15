import z from 'zod';

import { extractValidationData } from "../common/utils/extractValidationData";
import { IParticipantReq } from "./interfaces/participant.interface";

export const participantSchema = z.object({
    fullname:   z.string(),
    giveawayId: z.number(),
    code:       z.string(),
});

export function validateParticipant(data: IParticipantReq){
  const result = participantSchema.safeParse(data);

  const { hasError, errorMessages, data: participantData } = extractValidationData(result);

  return { hasError, errorMessages, participantData }
}
