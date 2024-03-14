import { Request, Response } from "express";
import { catchAsync } from "../errors";
import { validateGiveaway } from "./giveaways.schema";
import { GiveawayService } from "./giveaways.service";

export const getAllGiveaways = catchAsync(async(req: Request, res: Response) => {
    const giveaways = await GiveawayService.getAllGiveaways();
    return res.json(giveaways);
});

export const createGiveaway = catchAsync(async(req: Request, res: Response) => {
    const { hasError, errorMessages, giveawayData } = validateGiveaway(req.body);

    if (hasError) {
        return res.status(422).json({
            status: 'error',
            message: errorMessages
        })
    }

    const giveaway = await GiveawayService.createGiveaway(giveawayData);

    return res.status(201).json(giveaway);
});

