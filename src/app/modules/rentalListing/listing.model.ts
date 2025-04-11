import { model, Schema } from 'mongoose'
import IListing from './listing.interface'

const blogSchema = new Schema<IListing>(
  {
    landLoardId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    bedrooms: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    rentAmount: {
      type: Number,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

export const listing = model<IListing>('listing', blogSchema)
