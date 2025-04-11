interface IUser {
  username: string
  email: string
  image?: string
  phone: string
  password: string
  role: 'user'
  isBlocked: boolean
  isDeleted: boolean
}

export default IUser

export interface IloginUser {
  identifire: string
  password: string
}
