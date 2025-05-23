/* eslint-disable @typescript-eslint/no-unused-vars */
import bcrypt from 'bcrypt'
import { model, Schema } from 'mongoose'
import config from '../../config'
import IUser from './user.interface'

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: [true, 'Name is required'],
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'Name is required'],
      unique: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone is required'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      select: false,
    },
    role: {
      type: String,
      enum: ['admin', 'moderator', 'user'],
      default: 'user',
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

userSchema.pre('save', async function (next) {
  const salt_round = Number(config.BCRYPT_SALT)
  this.password = await bcrypt.hash(this.password, salt_round)
})

userSchema.post('save', async function (doc, next) {
  doc.password = ''
  next()
})

export const user = model<IUser>('user', userSchema)
