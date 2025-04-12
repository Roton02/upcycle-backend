import { Types } from 'mongoose'

export interface IListing {
  // Required Fields
  title: string
  description: string
  category: string
  brand: string
  price: number
  condition: string
  images: string[]
  status: 'available' | 'sold' | 'reserved'
  userID: Types.ObjectId // User ID as a string (ObjectId)

  // Optional Fields
  model?: string
  negotiable?: boolean
  usageDuration?: string
  warranty?: boolean
  warrantyDetails?: string
  purchaseDate?: Date
  location?: string
  deliveryOptions?: string[]
  tags?: string[]
  isFeatured?: boolean
  rating?: number
  soldDate?: Date
}
