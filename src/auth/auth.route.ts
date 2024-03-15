import { Router } from 'express';
import { createUser, loginUser } from "./auth.controller";
import { uploadSingle } from "../config/plugins/upload-files.plugin";
import {deleteUser, findAllUsers, findOneUser} from "./user.controller";
import {protect} from "./auth.middleware.js";


export const router = Router()

router.post('/login', loginUser)

router.use(protect)

router.route('/')
    .get(findAllUsers)
    .post(uploadSingle('avatar'), createUser)


router.route('/:id').get(findOneUser).delete(deleteUser)

