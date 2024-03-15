import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../errors";
import { validateParticipant } from "./participants.schema";
import { ParticipantService } from "./participants.service";

export const getAllParticipants = catchAsync(async (req: Request, res: Response) => {
    const participants = await ParticipantService.getAllParticipants(req.query);
    return res.json(participants);
})

export const createParticipant = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { hasError, errorMessages, participantData } = validateParticipant(req.body);

    if (hasError) {
        return res.status(422).json({
            status: 'error',
            message: errorMessages
        })
    }

    const user = await ParticipantService.createParticipant(participantData);

    return res.status(201).json(user);

});
