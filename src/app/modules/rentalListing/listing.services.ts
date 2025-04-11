import ILinting from './listing.interface'
import { listing } from './listing.model'

const createListingIntroDB = async (payload: ILinting) => {
  const result = await listing.create(payload)
  return result
}
const updateListingIntroDB = async (id: string, payload: Partial<ILinting>) => {
  const result = await listing.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
  return result
}
const deleteListingIntroDB = async (id: string) => {
  const result = await listing.findByIdAndDelete(id)
  return result
}
const getAllListingIntroDB = async () => {
  const result = await listing.find()
  return result
}
const getSingleListingIntoDB = async (id: string) => {
  const result = await listing.findById(id)
  return result
}

export const listingServices = {
  createListingIntroDB,
  updateListingIntroDB,
  deleteListingIntroDB,
  getAllListingIntroDB,
  getSingleListingIntoDB,
}
