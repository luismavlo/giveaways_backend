import { catchAsync } from "../errors";
import { NextFunction, Request, Response } from "express";
import { prisma } from "../config/database/postgres";
import { validateUser } from "./auth.schema";
import { generateUUID } from "../config/plugins/uuid.plugin";
import { UploadFileService } from "../common/services/upload-files-cloud.service.js";
import { encryptedPassword } from "../config/plugins/encripted-password.plugin";
import {UserService} from "./user.service";
import generateJWT from "../config/plugins/generate-jwt.plugin";

export const findAllUsers = catchAsync(async(req: Request, res: Response, next: NextFunction) => {

  const users = await prisma.user.findMany()

  return res.status(200).json(users)

})


export const createUser = catchAsync(async(req: Request, res: Response, next: NextFunction) => {

  const { hasError, errorMessages, userData } = validateUser(req.body);

  if(hasError){
    return res.status(422).json({
      status: 'error',
      message: errorMessages
    })
  }

  if(req.file?.buffer){
    const path = `user/${generateUUID()}-${req.file.originalname}`;

    userData.avatar = await UploadFileService.uploadToFirebase(path, req.file.buffer);
  }
  userData.avatar = 'https://www.w3schools.com/howto/img_avatar.png';

  userData.password = await encryptedPassword(userData.password);

  const user = await UserService.createUser(userData);

  const token = await generateJWT(user.userId)

  return res.status(200).json({
    message: 'Usuario creado correctamente.',
    data: {
      token,
      user,
    }
  })

})

export const loginUser = catchAsync(async(req: Request, res: Response, next: NextFunction) => {

})