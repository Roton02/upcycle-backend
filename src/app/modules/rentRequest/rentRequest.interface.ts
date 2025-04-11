import { Types } from 'mongoose'

export interface IRequest {
  rentHouseId: Types.ObjectId
  tenantId: Types.ObjectId
  status?: 'reject' | 'approve' | 'pending'
  landlordPhone?: number
  paymentstatus?: boolean
  tenantMessage?: string
  isDeleted?: boolean
}
