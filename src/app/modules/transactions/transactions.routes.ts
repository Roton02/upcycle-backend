import express from 'express'
import auth from '../../middleware/auth'
import zodValidator from '../../middleware/validator'
import { userRole } from '../auth/user.const'
import { TransactionController } from './transactions.controller'
import { OrderSchema } from './transactions.validation'

const router = express.Router()

router.post(
  '/',
  auth(userRole.user),
  zodValidator(OrderSchema),
  TransactionController.createTransaction
)

router.post('/payment/success', TransactionController.sslPaymentSuccess)

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

export const TransactionRoutes = router
