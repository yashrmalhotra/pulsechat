"use client"
import React, {
  useRef,
  useEffect,
  ReactNode,
  useContext,
  createContext,
  useState,
  useCallback,
} from "react"
import { io } from "socket.io-client"
import { useAuth } from "./AuthContextProvider"
import {
  CallList,
  CallTypes,
  Chat,
  ChatList,
  SocketProps,
  UserList,
} from "@/Types/type"
const SocketCaontext = createContext<SocketProps | null>(null)
const SocketContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const socket = useRef<any>(null)
  const room = useRef<string>("")
  const callRoom = useRef<string>("")
  const [callerDetails, setCallerDetails] = useState<CallTypes | null>(null)
  const [isCalling, setIsCalling] = useState<boolean>(false)
  const [isCallAccepted, setIsCallAccepted] = useState<boolean>(false)
  const [isDialed, setIsDialed] = useState<boolean>(false)
  const [recipientDetails, setRecipientDetails] =
    useState<Record<string, any>>()

  const { user } = useAuth()!
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const [callDuration, setCallDuration] = useState<number>(0)
  const [localStream, setLocalStream] = useState<MediaStream | null>(null)
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null)
  const [chatList, setChatList] = useState<(ChatList & UserList)[]>([])
  const [recentCallList, setRecentCallList] = useState<(CallList & UserList)[]>(
    [],
  )
  const [currentCallId, setCurrentCallId] = useState<string>("")
  const [isVideoCallDial, setIsVideoCallDial] = useState<boolean>(false)
  const [totalUnreadCount, setTotalUnreadCount] = useState<number>(0)
  const [totalMissedCall, setTotalMissedCall] = useState<number>(0)
  const callerDetailsRef = useRef<CallTypes | null>(null)
  const peerRef = useRef<any | null>(null)
  const [isCallLogsLoading, setIsCallLogsLoading] = useState<boolean>(false)
  useEffect(() => {
    if (user) {
      const handleReceiveMessageMarkAsDelivered = (senderEmail: string) => {
        socket.current.emit("markAsDelivered", {
          recipientEmail: user?.email,
          senderEmail,
        })
      }
      const handleNewMessageReceived = (newMessage: ChatList & UserList) => {
        setChatList((prev) => {
          const idx = prev.findIndex((c) => c.email === newMessage?.email)

          setTotalUnreadCount((prev) => prev + 1)
          if (idx !== -1) {
            const updated = [...prev]
            const chat = { ...updated[idx] }
            chat.lastMessage = newMessage.lastMessage
            chat.lastDate = newMessage.lastDate
            chat.lastTime = newMessage.lastTime
            chat.unreadCount = (chat.unreadCount || 0) + 1
            updated.splice(idx, 1)
            return [chat, ...updated]
          }
          const updateNewMessage = { ...newMessage, unreadCount: 1 }
          return [updateNewMessage, ...prev]
        })
      }
      if (!socket.current) {
        socket.current = io("http://localhost:3001")
      }
      socket.current.emit("user-online", {
        user: user?.username,
        email: user?.email,
      })
      socket.current.emit("bulkMarkAsDelivered", {
        recipientEmail: user?.email,
      })
      const handleIncomingCall = (callerdetails: CallTypes) => {
        socket.current.emit("join-room", { room: callerdetails?.callRoom })
        callRoom.current = callerdetails.callRoom
        setIsCalling(true)
        setCallerDetails(callerdetails)
        setCurrentCallId(callerdetails.callId)
        setRecentCallList((prev) => {
          const temp = [...prev]
          const idx = temp.findIndex(
            (call) => call.email === callerdetails?.callerEmail,
          )
          if (idx !== -1) {
            const updateCall = { ...temp[idx] }
            updateCall.latestCall.callType = callerdetails.callType
            updateCall.latestCall.dateTime = callerdetails.dateTime
            updateCall.latestCall.direction =( updateCall.latestCall.direction!=="missed" ) ? "incoming" : "missed"
            temp.splice(idx, 1)
            return [updateCall, ...temp]
          }
          const newCall: CallList & UserList = {
            _id: callerdetails?.callerId,
            email: callerdetails?.callerEmail,
            name: callerdetails?.callerName,
            username: callerdetails?.callerUsername,
            verificationStatus: callerdetails?.callerVeificationStatus,
            avatar: callerdetails?.callerAvatar,

            latestCall: {
              callType: callerdetails.callType,
              dateTime: callerdetails.dateTime,
              direction: "incoming",
            },
            missedCount: 0,
          }
          return [newCall, ...prev]
        })
      }
      const handleIncomingCallAccept = (answer: any) => {
        setIsCallAccepted(true)
        
        if (!peerRef.current) return
        peerRef.current.setRemoteDescription(answer)

        intervalRef.current = setInterval(() => {
          setCallDuration((prev) => prev + 1)
        }, 1000)
      }
      const handleAddIceCandidate = async (candidate: any) => {
        try {
          if (!peerRef.current) return
          await peerRef.current.addIceCandidate(candidate)
        } catch (error) {
          console.error(error)
        }
      }
      const handleHangup = () => {
        if (callerDetailsRef.current?.callerEmail) {
          setRecentCallList((prev) => {
            const temp = [...prev]
            const idx = temp.findIndex(
              (call) => call.email === callerDetailsRef.current!.callerEmail,
            )
            const updateCall = { ...temp[idx] }
            if (callDuration <= 0) {
              updateCall.latestCall.direction = "missed"
              updateCall.missedCount = updateCall.missedCount + 1
              setTotalMissedCall((prev) => prev + 1)
              temp[idx] = updateCall
            }
            return [...temp]
          })
        }

        endCall()
        if (intervalRef.current) {
          clearInterval(intervalRef?.current)
          intervalRef.current = null
        }
      }
      socket.current.on("new-message", handleNewMessageReceived)
      socket.current.on("isDelivered", handleReceiveMessageMarkAsDelivered)
      socket.current.on("incoming-call", handleIncomingCall)
      socket.current.on("accept-call", handleIncomingCallAccept)
      socket.current.on("reject-call", endCall)
      socket.current.on("ice-candidate", handleAddIceCandidate)
      socket.current.on("hang-up", handleHangup)
      return () => {
        if (socket.current) {
          socket.current.off("new-message", handleNewMessageReceived)
          socket.current.off("isDelivered", handleReceiveMessageMarkAsDelivered)
          socket.current.off("accept-call", handleIncomingCallAccept)
          socket.current.off("reject-call", endCall)
          socket.current.off("ice-candidate", handleAddIceCandidate)
          socket.current.off("hang-up", handleHangup)
          socket.current.off("incoming-call", handleIncomingCall)
        }
        if (intervalRef.current) {
          clearInterval(intervalRef?.current)
          intervalRef.current = null
        }
        peerRef.current = null
      }
    }
  }, [user])
  useEffect(()=>{
    callerDetailsRef.current = callerDetails
  },[callerDetails])
 
useEffect(() => {
  const total = recentCallList.reduce(
    (sum, call) => sum + (call.missedCount || 0),
    0
  )
  setTotalMissedCall(total)
}, [recentCallList])

  const handleIncomingCallReject = (e: React.MouseEvent) => {
    e.stopPropagation()
    socket.current.emit("reject-call", callRoom.current, callerDetails?.callId)
    endCall()
  }
  const handleIncomingCallAccept = async () => {
    peerRef.current = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    })
     setRecentCallList((prev) => {
          const temp = [...prev]
          const idx = temp.findIndex(
            (call) => call.email === callerDetails?.callerEmail,
          )
          if (idx !== -1) {
            const updateCall = { ...temp[idx] }
            updateCall.latestCall.direction = "incoming" 
            updateCall.missedCount = 0
            temp.splice(idx, 1)
            return [updateCall, ...temp]
          }
          return prev
        })

    peerRef.current.ontrack = (event: RTCTrackEvent) => {
      setRemoteStream(event.streams[0])
    }
    peerRef.current.onicecandidate = (event: any) => {
      if (event.candidate) {
        socket.current.emit("ice-candidate", {
          room: callRoom.current,
          candidate: event.candidate,
        })
      }
    }
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: callerDetails?.callType === "video",
    })
    setLocalStream(stream)
    stream.getTracks().forEach((track) => {
      peerRef!.current!.addTrack(track, stream)
    })
    await peerRef.current.setRemoteDescription(callerDetails!.offer)
    const answer = await peerRef.current.createAnswer()
    await peerRef.current.setLocalDescription(answer)
    socket.current.emit("accept-call", {
      room: callRoom.current,
      answer,
      callId: callerDetails?.callId,
    })
    setIsCallAccepted(true)
  }
  const endCall = useCallback(() => {
    if (peerRef.current) {
      peerRef.current.getSenders().forEach((sender: any) => {
        if (sender.track) {
          sender.track.stop()
        }
      })

      peerRef.current.ontrack = null
      peerRef.current.onicecandidate = null
      peerRef.current.close()
      peerRef.current = null
      setRemoteStream(null)
      setLocalStream(null)
      setCurrentCallId("")
    }

    setIsCalling(false)
    setIsCallAccepted(false)
    setIsDialed(false)
    setCallDuration(0)
    setCallerDetails(null)
  }, [])

  return (
    <SocketCaontext.Provider
      value={{
        socket,
        callDuration,
        isDialed,
        callerDetails,
        isCalling,
        room,
        callRoom,
        recipientDetails,
        setIsDialed,
        setRecipientDetails,
        setIsCalling,
        isCallAccepted,
        handleIncomingCallAccept,
        handleIncomingCallReject,
        localStream,
        setLocalStream,
        remoteStream,
        setRemoteStream,
        chatList,
        totalUnreadCount,
        setTotalUnreadCount,
        setChatList,
        recentCallList,
        isVideoCallDial,
        setIsVideoCallDial,
        setRecentCallList,
        peerRef,
        currentCallId,
        setCurrentCallId,
        endCall,
        totalMissedCall,
        setTotalMissedCall,
        isCallLogsLoading,
        setIsCallLogsLoading
      }}
    >
      {children}
    </SocketCaontext.Provider>
  )
}
export const useSocket = () => useContext(SocketCaontext)

export default SocketContextProvider
