import bcrypt from 'bcrypt';

export const encryptedPassword = async(password: string) => {
  const salt = await bcrypt.genSalt(12);
  return await bcrypt.hash(password, salt)
}

export const verifyPassword = async(bodyPassword: string, userPassword: string) => {
  return await bcrypt.compare(bodyPassword, userPassword)
}
