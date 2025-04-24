/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express'
import { SslCommerzPayment } from 'sslcommerz'
import config from '../../config'
import AppError from '../../error/AppError'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { SSLCOMMERZPaymentPayload } from './transactions.interface'
import TransactionModel from './transactions.model'
import { TransactionService } from './transactions.services'

const is_live = false

const createTransaction = catchAsync(async (req: Request, res: Response) => {
  const result = await TransactionService.createTransaction(
    req.body,
    req?.user?._id
  )

  const data: SSLCOMMERZPaymentPayload = {
    total_amount: req.body.totalPrice.toString(), // convert number to string
    currency: 'BDT',
    tran_id: result.transactionId.toString(),
    success_url: `${config.BASE_URL}/transactions/payment/success`,
    fail_url: `${config.BASE_URL}/transactions/payment/fail`,
    cancel_url: `${config.BASE_URL}/transactions/cancelled`,

    shipping_method: 'NO', // e.g., "NO" or "Courier"
    product_name: 'SecondHand Items',
    product_category: 'Used Items',
    product_profile: 'general',

    cus_name: req.user?.username?.toString() || 'anonymous',
    cus_email: req.user?.email?.toString() || 'anonymous@email.com',
    cus_add1: 'Dhaka',
    cus_phone: req.user?.phone?.toString() || '01700000000', // fallback

    num_of_item: 1,
    weight_of_items: 1,
    logistic_pickup_id: result.transactionId.toString(),
    logistic_delivery_type: 'NO',
    store_id: config.STORE_ID?.toString(),
    store_passwd: config.STORE_PASS?.toString(),
    cus_city: 'Dhaka',
    cus_postcode: '2354',
    cus_country: 'Bangladesh',
  }

  const sslcz = new SslCommerzPayment(
    config.STORE_ID!,
    config.STORE_PASS!,
    is_live
  )

  try {
    const apiResponse = await sslcz.init(data)

    if (apiResponse?.GatewayPageURL) {
      return sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Transaction created successfully',
        data: {
          transaction: result,
          gatewayUrl: apiResponse.GatewayPageURL,
        },
      })
    } else {
      throw new AppError(500, 'SSLCommerz init failed - GatewayPageURL missing')
    }
  } catch (error: any) {
    console.error('SSLCommerz Init Error:', error.message || error)
    throw new AppError(500, 'SSLCommerz init error')
  }
})

export const sslPaymentSuccess = catchAsync(
  async (req: Request, res: Response) => {
    const { val_id, tran_id, status } = req.body

    console.log(req.body)
    if (!tran_id || status !== 'VALID') {
      throw new AppError(400, 'Invalid payment status')
    }

    // Update DB transaction status
    const updatedTransaction = await TransactionModel.findOneAndUpdate(
      { _id: tran_id },
      { status: 'completed' },
      { new: true }
    )

    if (!updatedTransaction) {
      throw new AppError(404, 'Transaction not found')
    }

    // Optional: redirect user to your frontend success page
    res.redirect(`${config.FRONTEND_URL}/payment/success`)
  }
)

// const getUserPurchases = catchAsync(async (req: Request, res: Response) => {
//   const userId = req.params.userId
//   const result = await TransactionService.getUserPurchases(userId)
//   sendResponse(res, {
//     statusCode: 200,
//     success: true,
//     message: 'Purchase history retrieved successfully',
//     data: result,
//   })
// })

// const getUserSales = catchAsync(async (req: Request, res: Response) => {
//   const userId = req.params.userId
//   const result = await TransactionService.getUserSales(userId)
//   sendResponse(res, {
//     statusCode: 200,
//     success: true,
//     message: 'Sales history retrieved successfully',
//     data: result,
//   })
// })

// const updateTransactionStatus = catchAsync(
//   async (req: Request, res: Response) => {
//     const { id } = req.params
//     const { status } = req.body
//     const result = await TransactionService.updateTransactionStatus(id, status)
//     sendResponse(res, {
//       statusCode: 200,
//       success: true,
//       message: 'Transaction status updated successfully',
//       data: result,
//     })
//   }
// )

export const TransactionController = {
  createTransaction,
  sslPaymentSuccess,
  // getUserPurchases,
  // getUserSales,
  // updateTransactionStatus,
}
