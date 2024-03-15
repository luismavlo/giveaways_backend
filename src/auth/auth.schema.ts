import z from 'zod';

import { extractValidationData } from "../common/utils/extractValidationData";
import {ILoginUser, IUser} from "./user.interface";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,18}$/;
export const userSchema = z.object({
  fullname: z.string().min(8).max(200),
  email: z.string().email(),
  password: z.string().refine((password) => {
    return password.length >= 10 && password.length <= 18 && password.match(passwordRegex) !== null;
  }, {
    message: 'La contraseña debe tener entre 10 y 18 caracteres y contener al menos una mayúscula, una minúscula, un número y un carácter especial.',
  }),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export function validateUser(data: IUser){
  const result = userSchema.safeParse(data);

  const { hasError, errorMessages, data: userData } = extractValidationData(result);

  return { hasError, errorMessages, userData }
}


export function validateLogin(data: ILoginUser){
  const result = loginSchema.safeParse(data);

  const { hasError, errorMessages, data: loginData } = extractValidationData(result);

  return { hasError, errorMessages, loginData }
}


