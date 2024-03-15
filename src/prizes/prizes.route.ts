import { Router } from "express";
import { uploadSingle } from "../config/plugins/upload-files.plugin";
import { createPrize, deletePrize, getAllPrizes, updatePrize } from "./prizes.controllers";

export const router = Router();

router.route('/')
    .get(getAllPrizes)
    .post(uploadSingle('image'), createPrize)
    .put(uploadSingle('image'), updatePrize)
    .delete(deletePrize);
