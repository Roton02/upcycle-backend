import { z } from 'zod'

export const listingSchemaValidation = z.object({
  title: z
    .string({
      required_error: 'Title is required',
      invalid_type_error: 'Title must be a string',
    })
    .min(1, 'Title cannot be empty'),

  description: z
    .string({
      required_error: 'Description is required',
      invalid_type_error: 'Description must be a string',
    })
    .min(1, 'Description cannot be empty'),

  category: z
    .string({
      required_error: 'Category is required',
      invalid_type_error: 'Category must be a string',
    })
    .min(1, 'Category cannot be empty'),

  brand: z
    .string({
      required_error: 'Brand is required',
      invalid_type_error: 'Brand must be a string',
    })
    .min(1, 'Brand cannot be empty'),

  price: z
    .number({
      required_error: 'Price is required',
      invalid_type_error: 'Price must be a number',
    })
    .nonnegative('Price must be a positive number'),

  condition: z
    .string({
      required_error: 'Condition is required',
      invalid_type_error: 'Condition must be a string',
    })
    .min(1, 'Condition cannot be empty'),

  images: z
    .array(
      z.string({
        required_error: 'Each image must be a string URL',
        invalid_type_error: 'Image must be a string',
      })
    )
    .min(1, 'At least one image is required'),

  status: z.enum(['available', 'sold', 'reserved'], {
    required_error: 'Status is required',
    invalid_type_error: 'Status must be one of: available, sold, reserved',
  }),

  // Optional Fields
  userID: z.string().optional(),
  model: z.string().optional(),
  negotiable: z.boolean().optional(),
  usageDuration: z.string().optional(),
  warranty: z.boolean().optional(),
  warrantyDetails: z.string().optional(),
  purchaseDate: z.coerce.date().optional(),
  location: z.string().optional(),
  deliveryOptions: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  isFeatured: z.boolean().optional(),
  rating: z.number().optional(),
  soldDate: z.coerce.date().optional(),
})

export const listingUpdateSchemaValidation = z.object({
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  category: z.string().min(1).optional(),
  brand: z.string().min(1).optional(),
  price: z.number().nonnegative().optional(),
  condition: z.string().min(1).optional(),
  images: z.array(z.string()).min(1).optional(),
  status: z.enum(['available', 'sold', 'reserved']).optional(),

  userID: z.string().optional(),
  model: z.string().optional(),
  negotiable: z.boolean().optional(),
  usageDuration: z.string().optional(),
  warranty: z.boolean().optional(),
  warrantyDetails: z.string().optional(),
  purchaseDate: z.coerce.date().optional(),
  location: z.string().optional(),
  deliveryOptions: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  isFeatured: z.boolean().optional(),
  rating: z.number().optional(),
  soldDate: z.coerce.date().optional(),
})
