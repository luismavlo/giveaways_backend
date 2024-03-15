

export interface IUser {
  userId?: number
  fullname: string,
  email: string,
  password: string,
  avatar: string,
}


export interface ILoginUser {
  email: string,
  password: string,
}

export interface IDecodedToken {
  id: number,
  iat: number,
  exp: number
}

