import { z } from 'zod'

const userValidationSchema = z.object({
  username: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone is required'),
  password: z.string().min(5, 'Password must be at least 6 characters'),
  role: z.enum(['landlord', 'tenant']).default('tenant'),
  isBlocked: z.boolean().default(false),
  isDeleted: z.boolean().default(false),
})

const loginUserVaidation = z.object({
  identifire: z.string({
    required_error: 'email or username  is required',
  }),
  password: z.string({
    required_error: 'Password is required',
  }),
})

export const authValidation = { userValidationSchema, loginUserVaidation }
