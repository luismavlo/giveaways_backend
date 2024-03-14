import { Router } from "express";
import { createGiveaway, getAllGiveaways } from "./giveaways.controller";

export const router = Router();

router.route('/')
    .get(getAllGiveaways)
    .post(createGiveaway);
