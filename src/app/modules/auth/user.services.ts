import config from '../../config'
import AppError from '../../error/AppError'
import { blog } from '../rentalListing/listing.model'
import IUser, { IloginUser } from './user.interface'
import { user } from './user.model'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const createUserIntroDB = async (payload: IUser) => {
  const isExistByEmail = await user.findOne({ email: payload.email })
  if (isExistByEmail) {
    throw new AppError(400, 'Email is already exists')
  }
  const isExistbyUserName = await user.findOne({ username: payload.username })
  if (isExistbyUserName) {
    throw new AppError(400, 'username is already exists')
  }
  const isExistbyPhone = await user.findOne({ phone: payload.phone })
  if (isExistbyPhone) {
    throw new AppError(400, 'Number  is already exists')
  }
  const result = await user.create(payload)
  return result
}

const loginUserIntroDB = async (payload: IloginUser) => {
  const UserData = await user
    .findOne({
      $or: [{ email: payload?.identifire }, { username: payload?.identifire }],
    })
    .select('+password')
  if (!UserData) {
    throw new AppError(401, 'Invalid credentials')
  }
  // console.log(UserData)
  const verifyPassword = await bcrypt.compare(
    payload.password,
    UserData.password
  )

  if (!verifyPassword) {
    throw new AppError(401, 'Invalid credentials')
  }

  const VerifiedUser = {
    email: UserData.email,
    role: UserData.role,
  }

  const secret = config.JWT_SECRET as string

  const token = jwt.sign(VerifiedUser, secret, { expiresIn: '5h' })

  return { token }
}

const blockUsersIntroDB = async (id: string) => {
  const result = await user.findByIdAndUpdate(id, {
    isBlocked: true,
  })
  return result
}

const deleteBlogByAdminIntroDB = async (id: string) => {
  const result = await blog.findByIdAndDelete(id)
  return result
}

export const userServcies = {
  createUserIntroDB,
  loginUserIntroDB,
  blockUsersIntroDB,
  deleteBlogByAdminIntroDB,
}
