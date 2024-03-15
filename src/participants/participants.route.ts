import { Router } from 'express';
import { createParticipant, deleteParticipant, getAllParticipants, getOneParticipant } from './participants.controller';
import { protect } from '../auth/auth.middleware.js';

export const router = Router();

router.route('/')
    .get(getAllParticipants)
    .post(createParticipant);

router.route('/:id')
    .get(getOneParticipant)
    .delete(protect, deleteParticipant);
