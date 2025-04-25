import { model, Schema, Types } from 'mongoose'
import { ITransaction } from './transactions.interface'

const transactionSchema = new Schema<ITransaction>(
  {
    buyerID: {
      type: Schema.Types.ObjectId,
      required: [true, 'Buyer ID is required'],
      ref: 'user',
    },
    sellerID: {
      type: Schema.Types.ObjectId,
      required: [true, 'Buyer ID is required'],
      ref: 'user',
    },
    items: [
      {
        itemId: {
          type: Types.ObjectId,
          required: [true, 'Item ID is required'],
          ref: 'Listing',
        },
      },
    ],
    status: {
      type: String,
      enum: ['pending', 'completed', 'cancelled'],
      default: 'pending',
    },
    totalPrice: {
      type: Number,
      required: [true, 'Total price is required'],
      min: [0, 'Total price must be a non-negative number'],
    },
  },
  {
    timestamps: true,
  }
)

const TransactionModel = model<ITransaction>('Transaction', transactionSchema)

export default TransactionModel
