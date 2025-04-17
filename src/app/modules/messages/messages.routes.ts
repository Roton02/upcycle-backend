import express from 'express'
import auth from '../../middleware/auth'
import { MessageController } from './messages.controller'
import { userRole } from '../auth/user.const'

const router = express.Router()

router.post('/', auth(userRole.user), MessageController.sendMessage)
router.get('/:userId', auth(userRole.user), MessageController.getUserMessages)
router.get(
  '/conversation/:senderId/:receiverId',
  auth(userRole.user),
  MessageController.getConversation
)

export const MessageRoutes = router
