import { Schema, model } from 'mongoose'
import { ITransaction } from './transactions.interface'

const transactionSchema = new Schema<ITransaction>(
  {
    buyerID: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    sellerID: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    itemID: {
      type: Schema.Types.ObjectId,
      ref: 'Listing',
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'cancelled'],
      default: 'pending',
    },
    price: {
      type: Number,
      required: true,
    },
    transactionDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
)

const Transaction = model<ITransaction>('Transaction', transactionSchema)
export default Transaction
