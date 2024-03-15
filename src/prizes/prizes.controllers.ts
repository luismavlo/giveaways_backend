import { NextFunction, Request, Response } from "express";
import { AppError, catchAsync } from "../errors";
import { PrizeService } from "./prizes.service";
import { generateUUID } from "../config/plugins/uuid.plugin";
import { validatePrize } from "./prizes.schema";
import { PrizeBody } from "./interfaces/prize-body.interface";
import { CreatePrize } from "./interfaces";
import { UploadFileService } from "../common/services/upload-files-cloud.service";

export const getAllPrizes = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    if (!req.query.giveawayId) 
        return next(new AppError('you must send a giveawayId param', 400));

    const prizes = await PrizeService.getAllPrizes(+req.query.giveawayId);
    return res.json(prizes);
});

export const createPrize = catchAsync(async(req: Request, res: Response) => {
    const { hasError, errorMessages, prizeData } = validatePrize(req.body);

    if (hasError) {
        return res.status(422).json({
            status: 'error',
            message: errorMessages,
        });
    }

    if (req.file?.buffer) {
        const path = `prizes/${generateUUID()}-${req.file.originalname}`;
        prizeData.image = await UploadFileService.uploadToFirebase(path, req.file.buffer);
    }

    const { quantity, ...restPrize } = prizeData as PrizeBody;

    restPrize.giveawayId = +prizeData.giveawayId;

    const prize = await PrizeService.createPrize(restPrize as CreatePrize, +quantity);

    return res.status(201).json(prize);
});

export const deletePrize = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const { name, giveawayId } = req.query;
    if (!name || !giveawayId)
        return next(new AppError('name and giveawayId params are required', 400));

    await PrizeService.deletePrize(name as string, +giveawayId);
    return res.sendStatus(204);
});

export const updatePrize = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const { name, giveawayId } = req.query;
    if (!name || !giveawayId)
        return next(new AppError('name and giveawayId params are required', 400));

    if (req.file?.buffer) {
        const path = `prizes/${generateUUID()}-${req.file.originalname}`;
        req.body.image = await UploadFileService.uploadToFirebase(path, req.file.buffer);
    }
    if (req.body.giveawayId) req.body.giveawayId = +req.body.giveawayId;
    if (req.body.winnerId) req.body.winnerId = +req.body.winnerId;

    const prize = await PrizeService.updatePrize(req.body, name as string, +giveawayId)
    return res.json(prize);
});
