interface IUser {
  username: string
  email: string
  phone: string
  password: string
  role: 'admin' | 'moderator' | 'user'
  isBlocked: boolean
  isDeleted: boolean
}

export default IUser

export interface IloginUser {
  identifire: string
  password: string
}
