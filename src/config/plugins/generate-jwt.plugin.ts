import jwt from 'jsonwebtoken'
import { envs } from "../enviroments/enviroment";


const generateJWT = (id: number) => {
  return new Promise((resolve, reject) => {
    const payload = { id }

    jwt.sign(
        payload,
        envs.SECRET_JWT_SEED,
        {
          expiresIn: envs.JWT_EXPIRE_IN
        },
        (err, token) => {
          if (err) reject(err)

          resolve(token);
        }
    )

  })
}

export default generateJWT;