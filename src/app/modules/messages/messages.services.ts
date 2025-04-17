import { IMessage } from './messages.interface'
import Message from './messages.model'

const sendMessage = async (payload: IMessage) => {
  const result = await Message.create(payload)
  return result
}

const getUserMessages = async (userId: string) => {
  const messages = await Message.find({
    $or: [{ senderID: userId }, { receiverID: userId }],
  })
    .populate('senderID', 'username email')
    .populate('receiverID', 'username email')
    .populate('listingID', 'title price')
    .sort({ timestamp: -1 })
  return messages
}

const getConversation = async (senderId: string, receiverId: string) => {
  const messages = await Message.find({
    $or: [
      { senderID: senderId, receiverID: receiverId },
      { senderID: receiverId, receiverID: senderId },
    ],
  })
    .populate('senderID', 'username email')
    .populate('receiverID', 'username email')
    .sort({ timestamp: 1 })
  return messages
}

export const MessageService = {
  sendMessage,
  getUserMessages,
  getConversation,
}
