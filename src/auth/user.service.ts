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

  static async findOneUserById(userId: number){
    return prisma.user.findUnique({
      where: {
        userId: userId
      }
    })
  }

  static async findAllUser(){
    return prisma.user.findMany({
      select: {
        userId: true,
        fullname: true,
        email: true,
        avatar: true
      }
    });
  }

  static async deleteUser(userId: number){
    return prisma.user.delete({
      where: {
        userId: userId
      }
    })
  }

}