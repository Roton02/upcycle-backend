import { Router } from 'express'
import userRouter from '../modules/auth/user.routes'

const router = Router()

const routers = [
  {
    path: '/',
    router: userRouter,
  },
]

routers.forEach((route) => router.use(route.path, route.router))

export default router
