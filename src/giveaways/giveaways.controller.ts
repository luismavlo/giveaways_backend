import { Request, Response } from "express";
import { catchAsync } from "../errors";
import { validateGiveaway, validateUpdateGiveaway } from "./giveaways.schema";
import { GiveawayService } from "./giveaways.service";
import { generateUUID } from "../config/plugins/uuid.plugin";
import { UploadFileService } from "../common/services/upload-files-cloud.service.js";

export const getAllGiveaways = catchAsync(async(req: Request, res: Response) => {
    const giveaways = await GiveawayService.getAllGiveaways(req.query);
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

    if (req.file?.buffer) {
        const path = `giveaways/${generateUUID()}-${req.file.originalname}`;
        giveawayData.image = await UploadFileService.uploadToFirebase(path, req.file.buffer);
    }
    giveawayData.participantsLimit = +giveawayData.participantsLimit;

    const giveaway = await GiveawayService.createGiveaway(giveawayData);

    return res.status(201).json(giveaway);
});


export const getGiveawayById = catchAsync(async(req: Request, res: Response) => {
    const { id } = req.params;
    const giveaway = await GiveawayService.getGiveawayById(+id);
    return res.json(giveaway);
});


export const updateGiveaway = catchAsync(async(req: Request, res: Response) => {
    const { id } = req.params;

    if (req.file?.buffer) {
        const path = `giveaways/${generateUUID()}-${req.file.originalname}`;
        req.body.image = await UploadFileService.uploadToFirebase(path, req.file.buffer);
    }

    const giveaway = await GiveawayService.updateGiveaway(req.body, +id);

    return res.json(giveaway);
});


export const getGiveawayWinners = catchAsync(async(req: Request, res: Response) => {
    const { id } = req.params;

    const winners = await GiveawayService.getGiveawayWinners(+id);

    return res.json(winners);
});


export const generateGiveawayWinners = catchAsync(async(req: Request, res: Response) => {
    const { id } = req.params;

    const winners = await GiveawayService.generateGiveawayWinners(+id);

    return res.json(winners);
});
