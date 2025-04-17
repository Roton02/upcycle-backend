import { Schema, model } from 'mongoose'
import { IMessage } from './messages.interface'

const messageSchema = new Schema<IMessage>(
  {
    senderID: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    receiverID: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
    listingID: {
      type: Schema.Types.ObjectId,
      ref: 'Listing',
    },
  },
  {
    timestamps: true,
  }
)

const Message = model<IMessage>('Message', messageSchema)
export default Message
