/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { listingServices } from './listing.services'

const createListing = catchAsync(async (req: Request, res: Response) => {
  const blogData = req.body
  const result = await listingServices.createListingIntroDB(blogData)
  sendResponse(res, {
    success: true,
    message: 'Listing created successfully',
    statusCode: 201,
    data: result,
  })
})
const updateListing = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const blogData = req.body
  const result = await listingServices.updateListingIntroDB(id, blogData)
  sendResponse(res, {
    success: true,
    message: 'Blog updated successfully',
    statusCode: 200,
    data: result,
  })
})
const deleteListing = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await listingServices.deleteListingIntroDB(id)
  sendResponse(res, {
    success: true,
    message: 'Blog deleted successfully',
    statusCode: 200,
  })
})
const getAllListing = catchAsync(async (req: Request, res: Response) => {
  // console.log(req.query)
  const result = await listingServices.getAllListingIntroDB()
  sendResponse(res, {
    success: true,
    message: 'Blogs fetched successfully',
    statusCode: 200,
    data: result,
  })
})
const getSingleListing = catchAsync(async (req: Request, res: Response) => {
  // console.log(req.query)
  const result = await listingServices.getSingleListingIntoDB(req.params.id)
  sendResponse(res, {
    success: true,
    message: 'Blogs fetched successfully',
    statusCode: 200,
    data: result,
  })
})

export const listingController = {
  createListing,
  updateListing,
  deleteListing,
  getAllListing,
  getSingleListing,
}
