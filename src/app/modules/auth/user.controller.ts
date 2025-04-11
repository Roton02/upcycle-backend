/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { userServcies } from './user.services'

const createUser = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body
  const result = await userServcies.createUserIntroDB(payload)
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'User registered successfully',
    data: result,
  })
})

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body
  const result = await userServcies.loginUserIntroDB(payload)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Login successful',
    data: result,
  })
})
const blockUser = catchAsync(async (req: Request, res: Response) => {
  const payload = req.params.userId
  const result = await userServcies.blockUsersIntroDB(payload)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User blocked successfully',
  })
})

export const userControlloer = {
  createUser,
  loginUser,
  blockUser,
}
