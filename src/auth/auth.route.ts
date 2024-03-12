import { Router } from 'express';
import { findAllUsers } from "./auth.controller";


export const router = Router()

router.route('/').get(findAllUsers)
