import mongoose, { Schema } from 'mongoose'
import { IRequest } from './rentRequest.interface'

const RequestSchema = new Schema<IRequest>({
  rentHouseId: {
    type: Schema.Types.ObjectId,
    ref: 'listing',
    required: [true, 'House ID is required'],
  },
  tenantId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Tenant ID is required'],
  },
  status: {
    type: String,
    enum: ['reject', 'approve', 'pending'],
    default: 'pending',
  },
  landlordPhone: {
    type: Number,
    default: null,
  },
  paymentstatus: {
    type: Boolean,
    default: false,
  },
  tenantMessage: {
    type: String,
    default: null,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
})

export const Request = mongoose.model<IRequest>('Request', RequestSchema)
