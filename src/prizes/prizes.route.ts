import { Router } from "express";
import { uploadSingle } from "../config/plugins/upload-files.plugin";
import { createPrize, deletePrize, getAllPrizes, updatePrize } from "./prizes.controllers";
import { protect } from "../auth/auth.middleware.js";

export const router = Router();

router.route('/')
    .get(getAllPrizes)
    .post(protect, uploadSingle('image'), createPrize)
    .put(protect, uploadSingle('image'), updatePrize)
    .delete(protect, deletePrize);
