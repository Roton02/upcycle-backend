import { Router } from 'express'
import userRouter from '../modules/auth/user.routes'
import { ListingRoutes } from '../modules/listings/listings.routes'

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
]

routers.forEach((route) => router.use(route.path, route.router))

export default router
