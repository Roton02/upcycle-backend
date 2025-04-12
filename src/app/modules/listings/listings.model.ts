import { Schema, model } from 'mongoose'
import { IListing } from './listings.interface'

const listingSchema = new Schema<IListing>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
    },
    brand: {
      type: String,
      required: [true, 'Brand is required'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
    },
    condition: {
      type: String,
      required: [true, 'Condition is required'],
    },
    images: {
      type: [String],
      required: [true, 'At least one image is required'],
    },
    status: {
      type: String,
      enum: ['available', 'sold', 'reserved'],
      required: [true, 'Status is required'],
    },
    userID: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: [true, 'UserID (seller) is required'],
    },

    // Optional Fields
    model: String,
    negotiable: Boolean,
    usageDuration: String,
    warranty: Boolean,
    warrantyDetails: String,
    purchaseDate: Date,
    location: String,
    deliveryOptions: [String],
    tags: [String],
    isFeatured: Boolean,
    rating: Number,
    soldDate: Date,
  },
  {
    timestamps: true,
  }
)

const Listing = model<IListing>('Listing', listingSchema)
export default Listing
