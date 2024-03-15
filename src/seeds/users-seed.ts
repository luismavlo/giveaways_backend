import { IUser } from "../auth/user.interface";
import { encryptedPassword } from "../config/plugins/encripted-password.plugin";

export const createUsersSeed = async (): Promise<IUser[]> => [
    {
        userId: 1,
        fullname: 'John Doe',
        email: 'john@gmail.com',
        avatar: 'https://www.w3schools.com/howto/img_avatar.png',
        password: await encryptedPassword('John12345*')
    },
    {
        userId: 2,
        fullname: 'luis miguel',
        email: 'luis@gmail.com',
        avatar: 'https://www.w3schools.com/howto/img_avatar.png',
        password: await encryptedPassword('Luis12345*')
    },
]