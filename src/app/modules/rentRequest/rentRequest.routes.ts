import { Router } from 'express'
import { rentRequestControllers } from './rentRequest.controller'

const RentRouter = Router()

RentRouter.post('/', rentRequestControllers.createRentRequest)
RentRouter.get('/:id', rentRequestControllers.getSingleRentRequest)
RentRouter.get('/', rentRequestControllers.getRentRequest)
RentRouter.patch('/:id', rentRequestControllers.updateRentRequest)
RentRouter.delete('/:id', rentRequestControllers.deleteRentRequest)

export default RentRouter
