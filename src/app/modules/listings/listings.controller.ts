import { Request, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import ListingService from './listings.services'

const createListing = catchAsync(async (req: Request, res: Response) => {
  const listing = { ...req.body, userID: req?.user?._id }
  const result = await ListingService.createIntoDB(listing)
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Listing created.',
    data: result,
  })
})

const getAllListing = catchAsync(async (req: Request, res: Response) => {
  const result = await ListingService.getAllFromDB(req.query)
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Listings retrived.',
    data: result,
  })
})

const getOneByID = catchAsync(async (req: Request, res: Response) => {
  const result = await ListingService.getByIdFromDB(req.params.id)
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Listing retrived.',
    data: result,
  })
})

const deleteListing = catchAsync(async (req: Request, res: Response) => {
  const result = await ListingService.deleteFromDB(
    req.params.id,
    req?.user?._id
  )
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Listing deleted',
    data: result,
  })
})

const updateListing = catchAsync(async (req: Request, res: Response) => {
  const result = await ListingService.updateIntoDB(
    req.params.id,
    req.body,
    req?.user?._id
  )
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Listing Updated',
    data: result,
  })
})

export const ListingController = {
  createListing,
  getAllListing,
  getOneByID,
  deleteListing,
  updateListing,
}
