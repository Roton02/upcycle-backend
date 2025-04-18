import { Types } from 'mongoose'

export interface IMessage {
  senderID: Types.ObjectId
  receiverID: Types.ObjectId
  message: string
  read: boolean
  listingID?: Types.ObjectId
}
