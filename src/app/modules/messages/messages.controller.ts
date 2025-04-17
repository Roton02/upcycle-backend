import { Request, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { MessageService } from './messages.services'

const sendMessage = catchAsync(async (req: Request, res: Response) => {
  const message = { ...req.body, senderID: req?.user?._id }
  const result = await MessageService.sendMessage(message)
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Message sent successfully',
    data: result,
  })
})

const getUserMessages = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.userId
  const result = await MessageService.getUserMessages(userId)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Messages retrieved successfully',
    data: result,
  })
})

const getConversation = catchAsync(async (req: Request, res: Response) => {
  const { senderId, receiverId } = req.params
  const result = await MessageService.getConversation(senderId, receiverId)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Conversation retrieved successfully',
    data: result,
  })
})

export const MessageController = {
  sendMessage,
  getUserMessages,
  getConversation,
}
