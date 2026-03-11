import { JwtPayload } from "jsonwebtoken"

export interface AuthPayload extends JwtPayload {
  identifier: string,
  id:string,
}

export interface ChatInerface {
  text: string
  senderEmail: string
  recipientEmail: string
  time: String
  date: String
  isRead?: boolean
  chatId: string
  status: string
}
export interface CallInterface {
  callerEmail: string
  recipientEmail: string
  callType: "voice" | "video"
  callDuration?: number
  dateTime: Date
  status: "ringing" | "ended" | "rejected" | "accepted"

  callId: string
}
export interface ChatReadParams {
  recipientEmail: string
  senderEmail: string
}
