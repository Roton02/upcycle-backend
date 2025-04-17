import AppError from '../../error/AppError'
import { ITransaction } from './transactions.interface'
import Transaction from './transactions.model'

const createTransaction = async (payload: ITransaction) => {
  const result = await Transaction.create(payload)
  return result.populate([
    { path: 'buyerID', select: 'username email' },
    { path: 'sellerID', select: 'username email' },
    { path: 'itemID', select: 'title price images' },
  ])
}

const getUserPurchases = async (userId: string) => {
  const purchases = await Transaction.find({ buyerID: userId })
    .populate('sellerID', 'username email')
    .populate('itemID', 'title price images')
    .sort({ transactionDate: -1 })
  return purchases
}

const getUserSales = async (userId: string) => {
  const sales = await Transaction.find({ sellerID: userId })
    .populate('buyerID', 'username email')
    .populate('itemID', 'title price images')
    .sort({ transactionDate: -1 })
  return sales
}

const updateTransactionStatus = async (id: string, status: string) => {
  const transaction = await Transaction.findById(id)
  if (!transaction) {
    throw new AppError(404, 'Transaction not found')
  }

  const result = await Transaction.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  ).populate([
    { path: 'buyerID', select: 'username email' },
    { path: 'sellerID', select: 'username email' },
    { path: 'itemID', select: 'title price images' },
  ])

  return result
}

export const TransactionService = {
  createTransaction,
  getUserPurchases,
  getUserSales,
  updateTransactionStatus,
}
