import { Request } from "express";

export interface UserRequest extends Request {
  sessionUser: any
  user: any
}