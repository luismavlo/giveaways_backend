import { envs } from "../config/enviroments/enviroment";
import { AppError, catchAsync } from "../errors";
import jwt from "jsonwebtoken";
import { UserService } from "./user.service";
import { NextFunction, Request, Response } from "express";
import { UserRequest } from "./user.requests";
import { IDecodedToken } from "./user.interface";


export const protect = catchAsync(async(req: UserRequest,res: Response,next: NextFunction) => {

  let token;

  if(
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if(!token){
    return next(
        new AppError('You are not logged in!, Please log in to get access', 401)
    )
  }

  const decoded = jwt.verify(
      token,
      envs.SECRET_JWT_SEED
  ) as IDecodedToken;

  const user = await UserService.findOneUserById(decoded.id)

  if(!user){
    return next(
        new AppError('The owner of this token is not longer available', 401)
    )
  }

  req.sessionUser = user;
  next();

})

export const restrictTo = (...roles: any) => {
  return (req: UserRequest, res: Response, next: NextFunction) => {
    if(!roles.includes(req.sessionUser.role)){
      return next(new AppError('You do not have permission to perform this action', 403))
    }
    next();
  }
}

export const protectAccountOwner = ( req: UserRequest, res: Response, next: NextFunction) => {
  const { user, sessionUser } = req;

  if( user.id !== sessionUser.id ){
    return next(new AppError('You do not own this account', 401))
  }

  next();
}