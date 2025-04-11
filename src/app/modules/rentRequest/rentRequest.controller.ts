import { Request, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { rentRequestServices } from './rentRequest.service'

const createRentRequest = catchAsync(async (req: Request, res: Response) => {
  const result = await rentRequestServices.createRentRequestIntoDB(req.body)
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Rent request created successfully',
    data: result,
  })
})
const getRentRequest = catchAsync(async (req: Request, res: Response) => {
  const result = await rentRequestServices.getAllRentRequest()
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Rent request retrieved successfully',
    data: result,
  })
})
const getSingleRentRequest = catchAsync(async (req: Request, res: Response) => {
  const result = await rentRequestServices.getSingleRent(req.params.id)
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Rent request retrieved successfully',
    data: result,
  })
})
const updateRentRequest = catchAsync(async (req: Request, res: Response) => {
  const result = await rentRequestServices.updateRentRequest(
    req.params.id,
    req.body
  )
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Rent request retrieved successfully',
    data: result,
  })
})
const deleteRentRequest = catchAsync(async (req: Request, res: Response) => {
  const result = await rentRequestServices.deleteRentRequest(req.params.id)
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Rent request retrieved successfully',
    data: result,
  })
})

export const rentRequestControllers = {
  createRentRequest,
  getRentRequest,
  getSingleRentRequest,
  updateRentRequest,
  deleteRentRequest,
}
