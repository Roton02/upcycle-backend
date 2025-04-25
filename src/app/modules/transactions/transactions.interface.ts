import { Types } from 'mongoose'

export interface ITransaction {
  buyerID: Types.ObjectId
  sellerID: Types.ObjectId
  items: {
    itemId: Types.ObjectId
  }[]
  status: 'pending' | 'completed' | 'cancelled'
  totalPrice: number
}

export interface IOrderBody {
  items: {
    itemId: string
  }[]
  totalPrice: number
}

export interface SSLCOMMERZPaymentPayload {
  // Integration Required
  store_id: string | undefined
  store_passwd: string | undefined
  total_amount: number // decimal (10,2)
  currency: string // e.g., "BDT"
  tran_id: string
  product_category: string
  success_url: string
  fail_url: string
  cancel_url: string

  // Customer Info
  cus_name: string
  cus_email: string
  cus_add1: string
  cus_city: string
  cus_postcode: string
  cus_country: string
  cus_phone: string

  // Shipment (if needed, e.g., physical goods)
  shipping_method: string // e.g., "NO" or "Courier"
  num_of_item: number
  weight_of_items: number
  logistic_pickup_id: string
  logistic_delivery_type: string

  // Product Info
  product_name: string
  product_profile:
    | 'general'
    | 'physical-goods'
    | 'non-physical-goods'
    | 'airline-tickets'
    | 'travel-vertical'
    | 'telecom-vertical'
}
