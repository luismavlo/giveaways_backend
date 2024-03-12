import {catchAsync} from "../errors";
import {NextFunction, Request, Response} from "express";
import { prisma } from "../config/database/postgres";

export const findAllUsers = catchAsync(async(req: Request, res: Response, next: NextFunction) => {

  const users = await prisma.user.findMany()

  return res.status(200).json(users)

})