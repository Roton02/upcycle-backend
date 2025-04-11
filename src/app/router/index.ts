import { Router } from 'express'
import listingRouter from '../modules/rentalListing/listing.routes'
import userRouter from '../modules/auth/user.routes'
import RentRouter from '../modules/rentRequest/rentRequest.routes'

const router = Router()

const routers = [
  {
    path: '/listing',
    router: listingRouter,
  },
  {
    path: '/rent',
    router: RentRouter,
  },
  {
    path: '/',
    router: userRouter,
  },
]

routers.forEach((route) => router.use(route.path, route.router))

export default router
