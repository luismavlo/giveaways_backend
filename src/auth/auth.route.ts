import { Router } from 'express';
import {createUser, findAllUsers, loginUser} from "./auth.controller";
import { uploadSingle } from "../config/plugins/upload-files.plugin";


export const router = Router()

router.route('/')
    .get(findAllUsers)
    .post(uploadSingle('avatar'), createUser)

router.post('/login', loginUser)
