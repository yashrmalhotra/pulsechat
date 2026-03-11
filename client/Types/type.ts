import React, { SetStateAction } from "react"
import { Socket } from "socket.io-client"
import { z } from "zod"
export interface InputProps {
  labelText: string
  mendatory?: string
  placeholder: string
  additionalStyle?: string
  register?: any
  error?: any
  disabled?: boolean
}
export interface UserList {
  _id: string
  username: string
  name: string
  email: string
  avatar?: string
  verificationStatus: boolean
}
export interface Chat {
  id: string
  text: string
  time: string
  senderEmail: string
  recipientEmail: string
  date: string
  chatId: string
  status: string
  isRead: boolean
}

export interface SearchBarProps {
  showInput: boolean
  setShowInput: React.Dispatch<SetStateAction<boolean>>
  setUsers: React.Dispatch<SetStateAction<UserList[]>>
  setIsSearchLoading: React.Dispatch<SetStateAction<boolean>>
}
export interface SearchList {
  users: UserList[]
  isLoading: boolean
}
export interface ReactNodeProps {
  children: React.ReactNode
}
export interface UserDetailsTypes {
  _id: string
  name: string
  username: string
  email: string
  showLastSeen: boolean
  showReadStatus: boolean
  avatar: string | undefined
  verificationStatus: boolean
}

export interface IncomingCallScreenProps {
  callType: "voice" | "video"
  callerName: string
  callerUsername: string
  callerAvatar: string
}
export interface CallTypes {
  callType: "video" | "voice"
  callerName: string
  callerUsername: string
  callerAvatar: string
  callerEmail: string
  callerId: string
  callerVeificationStatus: boolean
  offer: RTCSessionDescriptionInit
  callId: string
  room: string
  callRoom: string
  dateTime: string
}
export interface CallActionProps {
  isVideoCallDial: boolean
  setIsVideoCall: React.Dispatch<SetStateAction<boolean>>
}
export interface ChatList {
  lastMessage: string
  lastTime: string
  lastDate: string
  isVerified: boolean
  unreadCount: number
}
export interface CallList {
  latestCall: {
    direction: "incoming" | "outgoing" | "missed"
    dateTime: string
    callType: "voice" | "video"
  }
  missedCount: number
}
export interface SocketProps {
  socket: any
  callerDetails: CallTypes | null
  isCalling: boolean
  isDialed: boolean
  recipientDetails: Record<string, any> | undefined
  setIsCalling: React.Dispatch<SetStateAction<boolean>>
  setIsDialed: React.Dispatch<SetStateAction<boolean>>
  setRecipientDetails: React.Dispatch<
    SetStateAction<Record<string, any> | undefined>
  >
  isCallAccepted: boolean
  handleIncomingCallAccept: () => void
  callDuration: number
  handleIncomingCallReject: (e: React.MouseEvent) => void
  totalUnreadCount: number
  setTotalUnreadCount: React.Dispatch<SetStateAction<number>>
  totalMissedCall: number
  setTotalMissedCall: React.Dispatch<SetStateAction<number>>
  room: React.RefObject<string | null>
  callRoom: React.RefObject<string | null>
  remoteStream: MediaStream | null
  setRemoteStream: React.Dispatch<SetStateAction<MediaStream | null>>
  localStream: MediaStream | null
  setLocalStream: React.Dispatch<SetStateAction<MediaStream | null>>
  peerRef: React.RefObject<RTCPeerConnection | null>
  chatList: (ChatList & UserList)[]
  setChatList: React.Dispatch<SetStateAction<(ChatList & UserList)[]>>
  recentCallList: (CallList & UserList)[]
  setRecentCallList: React.Dispatch<SetStateAction<(CallList & UserList)[]>>
  currentCallId: string
  setCurrentCallId: React.Dispatch<SetStateAction<string>>
  endCall: () => void
  isVideoCallDial: boolean
  setIsVideoCallDial: React.Dispatch<SetStateAction<boolean>>
  isCallLogsLoading: boolean
  setIsCallLogsLoading: React.Dispatch<SetStateAction<boolean>>
}

export interface AuthContextType {
  user: UserDetailsTypes | undefined
  setUser: React.Dispatch<SetStateAction<UserDetailsTypes | undefined>>
  isAuthLoading: boolean
  setIsAuthLoading: React.Dispatch<SetStateAction<boolean>>
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<SetStateAction<boolean>>
}
export interface ImageCropperProps {
  url: string
  setUrl: React.Dispatch<SetStateAction<string>>
}
export const FullSignUpFormSchema = z
  .object({
    name: z.string().min(1, "Please enter name"),
    username: z
      .string()
      .trim()
      .min(1, "Please enter username")
      .refine((val) => val.startsWith("@"), {
        message: "Username must start with @",
      })
      .refine((val) => !val.includes(" "), {
        message: "Username must not contain spaces",
      }),
    email: z.string().email("Please enter valid email"),
    password: z
      .string()
      .min(8, "Password length must be 8")
      .refine((val) => /[a-zA-Z]/.test(val), "Must contain atleast one letter")
      .refine((val) => /\d/.test(val), "Must contain atleast one number"),
    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password and confirm password must be same",
    path: ["confirmPassword"],
  })

export const SignInFormSchema = z.object({
  identifier: z.string().email("Please enter valid email"),
  password: z.string().min(8, "Please enter valid password"),
})
