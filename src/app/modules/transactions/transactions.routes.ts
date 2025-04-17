import express from 'express'
import auth from '../../middleware/auth'
import { TransactionController } from './transactions.controller'
import { userRole } from '../auth/user.const'

const router = express.Router()

router.post('/', auth(userRole.user), TransactionController.createTransaction)
router.get(
  '/purchases/:userId',
  auth(userRole.user),
  TransactionController.getUserPurchases
)
router.get(
  '/sales/:userId',
  auth(userRole.user),
  TransactionController.getUserSales
)
router.patch(
  '/:id',
  auth(userRole.user),
  TransactionController.updateTransactionStatus
)

export const TransactionRoutes = router
