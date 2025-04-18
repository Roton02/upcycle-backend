import AppError from '../../error/AppError'
import { user } from '../auth/user.model'
import Listing from '../listings/listings.model'
import { IOrderBody } from './transactions.interface'
import TransactionModel from './transactions.model'

const createTransaction = async (order: IOrderBody, buyerID: string) => {
  // check it there any itemID in items
  if (!buyerID || !Array.isArray(order.items) || order.items.length === 0) {
    throw new AppError(400, 'Invalid buyer ID or item list')
  }

  // check if the buyer exist
  const buyer = await user.findById(buyerID)
  if (!buyer) throw new AppError(404, 'Buyer not found')

  // check if every product is available
  for (const perItem of order.items) {
    const item = await Listing.findById(perItem.itemId)
    if (!item || item.status !== 'available') {
      throw new AppError(400, `Item ${item?.title} not available`)
    }
  }

  // create and return the transaction ID
  const { _id } = await TransactionModel.create({ ...order, buyerID })

  return { transactionId: _id }
}

// const getUserPurchases = async (userId: string) => {
//   const purchases = await Transaction.find({ buyerID: userId })
//     .populate('sellerID', 'username email')
//     .populate('itemID', 'title price images')
//     .sort({ transactionDate: -1 })
//   return purchases
// }

// const getUserSales = async (userId: string) => {
//   const sales = await Transaction.find({ sellerID: userId })
//     .populate('buyerID', 'username email')
//     .populate('itemID', 'title price images')
//     .sort({ transactionDate: -1 })
//   return sales
// }

// const updateTransactionStatus = async (id: string, status: string) => {
//   const transaction = await Transaction.findById(id)
//   if (!transaction) {
//     throw new AppError(404, 'Transaction not found')
//   }

//   const result = await Transaction.findByIdAndUpdate(
//     id,
//     { status },
//     { new: true }
//   ).populate([
//     { path: 'buyerID', select: 'username email' },
//     { path: 'sellerID', select: 'username email' },
//     { path: 'itemID', select: 'title price images' },
//   ])

//   return result
// }

export const TransactionService = {
  createTransaction,
  // getUserPurchases,
  // getUserSales,
  // updateTransactionStatus,
}
