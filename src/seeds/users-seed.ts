import { IUser } from "../auth/user.interface";

export const usersSeed: IUser[] = [
    {
        userId: 1,
        fullname: 'John Doe',
        email: 'john@gmail.com',
        avatar: 'https://www.w3schools.com/howto/img_avatar.png',
        password: '$2b$12$QvcZKMUK50pD74XHZNy2ju5DEucnp4a61Dwesz/Q0sgeWp5iyDRzW'
    },
    {
        userId: 2,
        fullname: 'luis miguel',
        email: 'luis@gmail.com',
        avatar: 'https://www.w3schools.com/howto/img_avatar.png',
        password: '$2b$12$KuXF/ZvWrgxXAcZNIecLlO1hLg9CxHS6ykNdo.VFMfpvWvZoQ8EjS'
    },
]