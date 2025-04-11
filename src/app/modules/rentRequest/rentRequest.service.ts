import { IRequest } from './rentRequest.interface'
import { Request } from './rentRequestModel'

const createRentRequestIntoDB = async (paylaod: IRequest) => {
  const result = await Request.create(paylaod)
  return result
}
const getSingleRent = async (id: string) => {
  const result = await Request.findById(id)
  return result
}
const getAllRentRequest = async () => {
  const result = await Request.find()
  return result
}
const updateRentRequest = async (id: string, payload: Partial<IRequest>) => {
  const result = await Request.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
  return result
}
const deleteRentRequest = async (id: string) => {
  const result = await Request.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    {
      new: true,
      runValidators: true,
    }
  )
  return result
}

export const rentRequestServices = {
  createRentRequestIntoDB,
  getAllRentRequest,
  getSingleRent,
  deleteRentRequest,
  updateRentRequest,
}
