import {AppError, catchAsync} from "../errors";
import {NextFunction, Request, Response} from "express";
import {UserService} from "./user.service";


export const findAllUsers = catchAsync(async(req: Request, res: Response, next: NextFunction) => {

  const users = await UserService.findAllUser();

  return res.status(200).json(users)

});

export const findOneUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

  const { id } = req.params;

  const user = await UserService.findOneUserById(+id);

  if(!user) return next(new AppError(`User not found with id: ${id}`, 404));

  return res.status(200).json({
    user: {
      userId: user.userId,
      fullname: user.fullname,
      email: user.email,
      avatar: user.avatar
    },
  });

});

export const deleteUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  const user = await UserService.findOneUserById(+id);

  if(!user) return next(new AppError(`User not found with id: ${id}`, 404));

  await UserService.deleteUser(+id);

  return res.status(204).json(null)
})

