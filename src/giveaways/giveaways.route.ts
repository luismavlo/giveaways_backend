import { Router } from "express";
import { createGiveaway, getAllGiveaways, getGiveawayById, getGiveawayWinners, generateGiveawayWinners, updateGiveaway } from "./giveaways.controller";
import { uploadSingle } from "../config/plugins/upload-files.plugin";
import { protect } from "../auth/auth.middleware.js";

export const router = Router();

router.route('/')
    .get(getAllGiveaways)
    .post(protect, uploadSingle('image'), createGiveaway);

router.route('/:id')    
    .get(getGiveawayById)
    .put(protect, uploadSingle('image'), updateGiveaway);

router.route('/:id/winners')
    .get(getGiveawayWinners);

router.route('/:id/generate-winners')
    .get(protect, generateGiveawayWinners);
