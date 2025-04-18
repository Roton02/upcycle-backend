import { Request, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { TransactionService } from './transactions.services'

const createTransaction = catchAsync(async (req: Request, res: Response) => {
  const transaction = { ...req.body, buyerID: req?.user?._id }
  const result = await TransactionService.createTransaction(transaction)
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Transaction created successfully',
    data: result,
  })
})

const getUserPurchases = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.userId
  const result = await TransactionService.getUserPurchases(userId)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Purchase history retrieved successfully',
    data: result,
  })
})

const getUserSales = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.userId
  const result = await TransactionService.getUserSales(userId)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Sales history retrieved successfully',
    data: result,
  })
})

const updateTransactionStatus = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const { status } = req.body
    const result = await TransactionService.updateTransactionStatus(id, status)
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Transaction status updated successfully',
      data: result,
    })
  }
)

export const TransactionController = {
  createTransaction,
  getUserPurchases,
  getUserSales,
  updateTransactionStatus,
}
