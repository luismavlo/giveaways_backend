import {IUser} from "./user.interface";
import {prisma} from "../config/database/postgres";


export class UserService {

  static async createUser(data: IUser) {
    return prisma.user.create({
      data: data
    });
  }

  static async findOneUserByEmail(email: string) {
    return prisma.user.findUnique({
      where: {
        email
      }
    })
  }

}