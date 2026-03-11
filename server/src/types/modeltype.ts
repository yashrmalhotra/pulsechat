import { Document } from "mongoose"
import { CallInterface, ChatInerface } from "./type"

export interface IUSER extends Document {
  avatar: string
  name: string
  username: string
  email: string
  authStrategy: string
  googleId?: String
  password?: string
  verificationCode?: string
  verificationStatus?: boolean
  showLastSeen: boolean
  lastSeen: Date
  showReadStatus: boolean

}
export interface IChat extends Document, ChatInerface {}
export interface ICall extends Document, CallInterface {}
