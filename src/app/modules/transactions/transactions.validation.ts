import { z } from 'zod'

export const OrderSchema = z.object({
  items: z.array(
    z.object({
      itemId: z.string(),
    })
  ),
  totalPrice: z.number(),
})
