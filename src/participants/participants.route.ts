import { Router } from 'express';
import { createParticipant, getAllParticipants } from './participants.controller';

export const router = Router();

router.route('/')
    .get(getAllParticipants)
    .post(createParticipant);
