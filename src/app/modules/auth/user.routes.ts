import { Router } from 'express'
import zodValidator from '../../middleware/validator'
import { userControlloer } from './user.controller'
import { authValidation } from './user.validation'
// import auth from '../../middleware/auth'

const userRouter = Router()

userRouter.post(
  '/auth/register',
  // zodValidator(authValidation.userValidationSchema),
  userControlloer.createUser
)
userRouter.post(
  '/auth/login',
  zodValidator(authValidation.loginUserVaidation),
  userControlloer.loginUser
)
userRouter.get('/admin/users', userControlloer.getAllUsers) //auth('admin'),
userRouter.delete(
  '/admin/users/:userId',
  // auth('admin'),
  userControlloer.deleteUser
)
userRouter.patch(
  '/admin/users/:userId',
  // auth('admin'),
  userControlloer.blockUser
)
userRouter.patch('/user/:userId', userControlloer.updateuser) //auth('user')
userRouter.post('/validToken', userControlloer.validToken) //auth('user')
userRouter.delete('/auth/logout', userControlloer.logout) //auth('user')
userRouter.patch('/update-password/:userId', userControlloer.updatePass) //auth('user')
userRouter.post(
  '/forgot-password/',
  zodValidator(authValidation.forgotPasswordValidation),
  userControlloer.forgotPass
) //auth('user')
userRouter.patch(
  '/reset-password/:userId',
  zodValidator(authValidation.resetPasswordValidation),
  userControlloer.resetPass
) //auth('user')

// /api/admin/users/:userId/block

// /api/admin/users/:userId/block

export default userRouter
