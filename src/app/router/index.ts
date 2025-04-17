import { Router } from 'express'
import userRouter from '../modules/auth/user.routes'
import { ListingRoutes } from '../modules/listings/listings.routes'
import { TransactionRoutes } from '../modules/transactions/transactions.routes'
import { MessageRoutes } from '../modules/messages/messages.routes'

const router = Router()

const routers = [
  {
    path: '/',
    router: userRouter,
  },
  {
    path: '/listings',
    router: ListingRoutes,
  },
  {
    path: '/transactions',
    router: TransactionRoutes,
  },
  {
    path: '/messages',
    router: MessageRoutes,
  },
]

routers.forEach((route) => router.use(route.path, route.router))

export default router
