import { Router } from "express";
import { createGiveaway, getAllGiveaways, getGiveawayById, getGiveawayWinners, updateGiveaway } from "./giveaways.controller";
import { uploadSingle } from "../config/plugins/upload-files.plugin";

export const router = Router();

router.route('/')
    .get(getAllGiveaways)
    .post(uploadSingle('image'), createGiveaway);

router.route('/:id')    
    .get(getGiveawayById)
    .put(uploadSingle('image'), updateGiveaway);

router.route('/:id/winners')
    .get(getGiveawayWinners);
