import bcrypt from  'bcrypt';
import { Users } from '../models';

export const createUser = async ({email, name, password}) => {
  const encryptedPassword = await bcrypt.hash(password, 8)
  const currentTime = new Date()
  return {
    name,
    email,
    password: encryptedPassword,
    createdAt: currentTime,
    updatedAt: currentTime
  }
}

export const checkIfUserExists = async(param, value) => {
  const user = await Users.findOne({[param]: value})
  if (user) {
    return user
  } else {
    throw "User does not exist"
  }
}

export const validatePassword = async (password, user) => {
  return await bcrypt.compare(password, user.password)
}