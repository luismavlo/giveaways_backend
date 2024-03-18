import { envs } from "../config/enviroments/enviroment";
import { AppError } from "./appError";
import { Request, Response, NextFunction } from 'express';




const handleCastError22001 = () => 
  new AppError('value too long for type on attribute in database', 400)

const handleCastError23505 = () =>
  new AppError('Duplicate field value: please use another value', 400)

const handleCastError22P02 = () =>
  new AppError('Invalid data type in database', 400);

const handleCastErrorP2025 = () =>
  new AppError('Resource not found', 404);

const handleJWTExpiredError = () => 
  new AppError('Your token has expired! Please login again', 401)

const handleJWTError = () =>
  new AppError('Invalid token. Please login again', 401)

const handleInvalidDiscordCode = () => 
  new AppError("Invalid Discord Code", 401);

const handleIsntInServer = () => 
  new AppError("User isn't in DevTalles", 401);

const handleDuplicatesP2002 = () => 
  new AppError("Duplicate fields", 400);
 
const sendErrorDev = (err: any, res: Response) => {
  res.status(err.statusCode).json({
    status: err.status,
    message : err.message,
    stack: err.stack,
    error: err
  })
}

const sendErrorProd = async(err: any,res: Response) => {
 if(err.isOperational){
  //operational, trusted error: send message to client
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  })
 }else {
  //programming or other unknown error: don't leak error detail
  console.log("ERROR 🧨",err);
  res.status(500).json({
    status: 'fail',
    message: 'Something went very wrong!'
  })
 }
}

export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {

  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'fail'

  if(envs.NODE_ENV === 'development'){
    sendErrorDev(err, res)
  }

  if(envs.NODE_ENV === 'production'){
    let error = err;
 
    if(err.parent?.code === '22001') error = handleCastError22001();
    if(err.parent?.code === '23505') error = handleCastError23505();
    if (err.parent?.code === '22P02') error = handleCastError22P02();
    if (err.code === 'P2025') error = handleCastErrorP2025();
    if (err.code === 'P2002') error = handleDuplicatesP2002();
    if(err.name === 'TokenExpiredError') error = handleJWTExpiredError();
    if(err.name === 'JsonWebTokenError') error = handleJWTError();
    if (err.response?.data?.error_description == 'Invalid "code" in request.')
      error = handleInvalidDiscordCode();
    if (error.response?.data.code === 10004) error = handleIsntInServer();

    sendErrorProd(error, res)
  }

}

