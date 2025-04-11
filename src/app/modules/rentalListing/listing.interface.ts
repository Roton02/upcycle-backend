import { Types } from 'mongoose'

interface IListing {
  landLoardId: Types.ObjectId
  location: string
  description: string
  rentAmount: number
  bedrooms: number
  images: string[]
  isDeleted: boolean
}

export default IListing
