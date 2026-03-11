"use client"
import {
  Box,
  Button,
  Typography,
  Avatar,
  Skeleton,
  IconButton,
} from "@mui/material"
import { MdOutlineSend, MdAddIcCall, MdVideoCall } from "react-icons/md"
import CallAction from "./CallAction"
import React, { useEffect, useRef, useState, useCallback } from "react"
import { useAuth } from "../context/AuthContextProvider"
import { useParams } from "next/navigation"
import { CallList, Chat, UserList } from "@/Types/type"
import { useSocket } from "../context/SocketContextProvider"
import { TiTick } from "react-icons/ti"
import { RiArrowDownDoubleFill } from "react-icons/ri"
import { GoCheck } from "react-icons/go"
import { LiaCheckDoubleSolid } from "react-icons/lia"
import axios from "axios"
import {
  dateFormatter,
  generateDateLabel,
  groupMessageByDate,
} from "@/utils/utils"

const ChatWindow = () => {
  const [message, setMessage] = useState<string>("")
  const params = useParams()
  const [messages, setMessages] = useState<Record<string, Chat[]> | null>(null)
  const {
    socket,
    isCalling,
    setIsCalling,
    peerRef,
    setLocalStream,
    setRemoteStream,
    setRecipientDetails,
    setCurrentCallId,
    recipientDetails,
    isDialed,
    setIsDialed,
    isVideoCallDial,
    setIsVideoCallDial,
    room,
    callRoom,
    setTotalUnreadCount,
    setRecentCallList,
    setTotalMissedCall,
  } = useSocket()!
  const { user } = useAuth()!
  const [status, setStatus] = useState<string>("")
  const isTypingRef = useRef<boolean>(false)
  const typingTimeOut = useRef<any>(null)
  const [isUserLoading, setIsUserLoading] = useState<boolean>()
  const [isAtBottom, setIsAtBottom] = useState<boolean>(true)
  const chatContainerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if(isCalling) return;
    ;(async () => {
      try {
        const userid = decodeURIComponent(params.userid as string)
        setIsUserLoading(true)
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/chat/recipient-chat?recipient=${userid}&user=${user?.email}`,
          {
            withCredentials: true,
          },
        )
        setRecipientDetails(res.data.recipient)
        const grouped = groupMessageByDate(res.data.chats)

        setMessages(grouped)
        if (res.data.status) {
          if (res.data.status.startsWith("last seen")) {
            const formatDate = dateFormatter(res.data.status.split("-")[1])
            setStatus(formatDate)
          } else {
            setStatus(res.data.status)
          }
        }
        if (!room.current) {
          room.current = [user?.username, userid].sort().join("_")

          socket.current.emit("join-room", {
            room: room.current,
            targetUser: userid,
          })
        }
        if (isDialed) {
          if (isVideoCallDial) {
            handleDial("video")
          } else {
            handleDial("voice")
          }
        }
      } finally {
        setIsUserLoading(false)
      }
    })()
  }, [isCalling])
  useEffect(() => {
    if(!socket.current) return
    socket.current.on("markAsSend", handleMarkAsSend)
    socket.current.on("markAsRead", handleMarkAsRead)
    socket.current.on("receive-message", handleReceiveMessage)
    socket.current.on("bulkMarkAsDelivered", handleMarkAsDelivered)
    socket.current.on("markAsDelivered", handleMarkAsDelivered)

    socket.current.on("user-status", (status: string) => {
      if (status.startsWith("last seen")) {
        const formatDate = dateFormatter(status.split("-")[1])
        setStatus(formatDate)
      } else {
        setStatus(status)
      }
    })
    return () => {
      socket.current.off("markAsSend", handleMarkAsSend)
      socket.current.off("markAsRead", handleMarkAsRead)
      socket.current.off("receive-message", handleReceiveMessage)
      socket.current.off("markAsDelivered", handleMarkAsDelivered)
      socket.current.off("bulkMarkAsDelivered", handleMarkAsDelivered)

      socket.current.off("user-status")
    }
  }, [])
  useEffect(() => {
    if (!socket.current) return
    if (!room.current) return
    if (!recipientDetails?.email) return
    if (!user?.email) return
    if (!isAtBottom) return
    if (!messages) return
    const t = setTimeout(handleReading, 100)

    return () => clearTimeout(t)
  }, [messages, isAtBottom, recipientDetails])

  useEffect(() => {
    if (!chatContainerRef.current) return
    if (!isAtBottom) return
    setTotalUnreadCount(0)
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
  }, [messages, isAtBottom])

  const handleReceiveMessage = useCallback(
    (message: Chat) => {
      const dateLabel = generateDateLabel(message.date)

      setMessages((prev) => {
        const safePrev = prev || {} // ✅ prevent null crash

        return {
          ...safePrev,
          [dateLabel]: [...(safePrev[dateLabel] || []), message],
        }
      })
    },

    [recipientDetails],
  )

  const handleReading = useCallback(() => {
    if (!messages) return
 
    let unreadExists = false
    Object.keys(messages).forEach((key) => {
      if (!unreadExists) {
        const copy = { ...messages }
        unreadExists = copy[key].some(
          (m) =>
            m.recipientEmail === user?.email &&
            m.senderEmail === recipientDetails?.email &&
            !m.isRead,
        )
      } else {
        return
      }
    })

    if (!unreadExists) return
    
      socket.current.emit("reading-done", {
        recipientEmail: user?.email,
        senderEmail: recipientDetails?.email,
        room: room.current,
        showReadStatus:user?.showReadStatus
      })
    
  }, [recipientDetails, messages])
  const handleMarkAsSend = useCallback(
    (chatId: string, date: string) => {
      const dateLabel = generateDateLabel(date)
      setMessages((prev) => {
        const temp = { ...prev }
        const arr = [...temp[dateLabel]]
        const isMessageExist = arr.some((chat) => chat.chatId === chatId)
        if (!isMessageExist) {
          return { ...prev }
        } else {
          if (prev) {
            const newArr = arr.map((chat) =>
              chat.chatId === chatId ? { ...chat, status: "send" } : chat,
            )
            prev[dateLabel] = newArr as Chat[]
          }
          return { ...prev }
        }
      })
    },
    [recipientDetails],
  )
  const handleMarkAsDelivered = useCallback(() => {
    setTimeout(() => {
      setMessages((prev) => {
        const updated = { ...prev }
        const keys = Object.keys(updated)
        for (const key of keys) {
          const arr = [...updated[key]]
          const newArr = arr.map((msg) =>
            msg.senderEmail === user?.email
              ? { ...msg, status: "delivered" }
              : msg,
          )
          updated[key] = newArr
        }
        return { ...updated }
      })
    }, 100)
  }, [recipientDetails])
  const handleMarkAsRead = useCallback(() => {
    if (!user || !room.current) return

    setMessages((prev) => {
      const updated = { ...prev }
      const keys = Object.keys(updated)
      for (const key of keys) {
        const arr = [...updated[key]]
        const newArr = arr.map((msg) =>
          msg.senderEmail === user?.email ? { ...msg, isRead: true } : msg,
        )
        updated[key] = newArr
      }
      return { ...updated }
    })
  }, [recipientDetails])
  const handleSend = () => {
    const dateObj = new Date()
    const time = dateObj.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
    const date = dateObj.toISOString()

    socket.current.emit("send-message", {
      text: message,
      room: room.current,
      senderEmail: user?.email,
      recipientEmail: recipientDetails?.email,
      time,
      date,
      chatId: room.current + "/" + dateObj.toISOString(),
      avatar: user?.avatar,
      isVerified: user?.verificationStatus,
      name: user?.name,
      username: user?.username,
    })
    setMessage("")
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value)
    if (!isTypingRef.current) {
      socket.current.emit("user-typing", {
        room: room.current,
        status: "typing...",
      })
      isTypingRef.current = true
    }
    if (typingTimeOut.current) {
      clearTimeout(typingTimeOut.current)
    }
    typingTimeOut.current = setTimeout(() => {
      socket.current.emit("user-typing", {
        room: room.current,
        status: "online",
      })
      isTypingRef.current = false
    }, 500)
  }
  const handleDial = async (callType: "video" | "voice") => {
    setIsDialed(true)
    setIsCalling(true)
    callRoom.current = `call-${room.current}`
    socket.current.emit("join-room", {
      room: callRoom.current,
    })
    setIsVideoCallDial(callType === "video")
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: callType === "video",
    })

    setLocalStream(stream)
    peerRef.current = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    })
    stream.getTracks().forEach((track) => {
      peerRef.current?.addTrack(track, stream)
    })
    peerRef.current.onicecandidate = (event) => {
      if (event.candidate) {
        socket.current.emit("ice-candidate", {
          room: callRoom.current,
          candidate: event.candidate,
        })
      }
    }
    peerRef.current.ontrack = (event) => {
      setRemoteStream(event.streams[0])
    }
    if (peerRef.current.signalingState !== "stable") return
    const offer = await peerRef.current.createOffer()
    await peerRef.current.setLocalDescription(offer)
    const callId =
      callRoom.current + "/" + callType + "/" + new Date().toISOString()

    socket.current.emit("make-call", {
      callType,
      callerId: user?._id,
      callerAvatar: user?.avatar,
      callerName: user?.name,
      callerEmail: user?.email,
      callerUsername: user?.username,
      callerVerificationStatus: user?.verificationStatus,
      callRoom: callRoom.current,
      recipientEmail: recipientDetails?.email,
      callId,
      dateTime: new Date(Date.now()).toISOString(),
      offer,
    })

    setCurrentCallId(callId)
    setRecentCallList((prev) => {
      const temp = [...prev]
      const idx = temp.findIndex(
        (call) => call.email === recipientDetails?.email,
      )
      if (idx !== -1) {
        const updateCall = { ...temp[idx] }
        setTotalMissedCall((prev) => prev - updateCall.missedCount)
        updateCall.latestCall.callType = callType
        updateCall.latestCall.dateTime = new Date(Date.now()).toISOString()
        updateCall.missedCount = 0
        updateCall.latestCall.direction = "outgoing"
        temp.splice(idx, 1)
        return [updateCall, ...temp]
      }
      const newCall: CallList & UserList = {
        _id: recipientDetails?._id,
        email: recipientDetails?.email,
        name: recipientDetails?.name,
        username: recipientDetails?.username,
        verificationStatus: recipientDetails?.verificationStatus,
        avatar: recipientDetails?.avatar,
        latestCall: {
          callType,
          dateTime: new Date(Date.now()).toISOString(),
          direction: "outgoing",
        },
        missedCount: 0,
      }
      return [newCall, ...prev]
    })
  }
  const handleScroll = () => {
    const el = chatContainerRef.current
    if (el) {
      const scrollDistance = el.scrollHeight - el.scrollTop - el.clientHeight
      if (scrollDistance > 40) {
        setIsAtBottom(false)
      } else {
        setIsAtBottom(true)
      }
    }
  }
  const handleClickToBottom = () => {
    const el = chatContainerRef.current
    if (el) {
      el.scrollTop = el.scrollHeight
      setIsAtBottom(true)
    }
  }
  return (
    <div className="flex flex-col relative justify-between w-full h-full bg-[url(/chatwallpaper.jpeg)]">
      {!isAtBottom && (
        <IconButton
          onClick={handleClickToBottom}
          sx={{
            width: "35px",
            height: "35px",
            bgcolor: "white",
            position: "fixed",
            bottom: "108px",
            right: "25px",
            zIndex: "100",
            border: "1px solid black",
            borderRadius: "9999px",
            fontWeight: "bold",
            "&:hover": {
              bgcolor: "white",
            },
          }}
        >
          <RiArrowDownDoubleFill />
        </IconButton>
      )}
      <nav className="w-full mt-1 bg-white pr-2 h-14 flex justify-between items-center gap-4">
        {isUserLoading ? (
          <Box
            sx={{
              display: "flex",
              gap: "4px",
              marginLeft: "4px",
              alignItems: "center",
            }}
          >
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton width={30} height={20} />
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              gap: "4px",
              marginLeft: "4px",
              alignItems: "center",
            }}
          >
            <Avatar src={recipientDetails?.avatar ?? undefined} />
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ display: "inline-flex", gap: "5px" }}>
                {recipientDetails?.name}
              </Typography>
              &nbsp;
              {recipientDetails?.verificationStatus && (
                <div className="rounded-full inline-flex justify-center items-center w-3 h-3 bg-blue-400 text-white">
                  <TiTick />
                </div>
              )}
            </Box>
            <Typography
              sx={{
                fontSize: "8px",
                color: status === "typing" ? "green" : "90a1b9",
              }}
            >
              {status}
            </Typography>
          </Box>
        )}
        <div className="flex gap-2">
          <Button
            onClick={() => handleDial("voice")}
            sx={{
              height: 40,
              width: 40,
              backgroundColor: "#cc00ff",
              borderRadius: "10%",
              color: "white",
              "& .MuiTouchRipple-child": {
                backgroundColor: "#cc00ff",
              },
            }}
          >
            <MdAddIcCall size={25} />
          </Button>
          <Button
            onClick={() => handleDial("video")}
            sx={{
              height: 40,
              width: 40,
              backgroundColor: "#cc00ff",
              borderRadius: "10%",
              color: "white",
              "& .MuiTouchRipple-child": {
                backgroundColor: "#cc00ff",
              },
            }}
          >
            <MdVideoCall size={25} />
          </Button>
        </div>
      </nav>
      <div
        ref={chatContainerRef}
        onScroll={handleScroll}
        className="flex-1 p-4 overflow-y-auto space-y-3 "
      >
        {messages &&
          Object.entries(messages).map(([date, message]) => (
            <div key={date}>
              <div  className="w-full flex justify-center sticky top-0">
                <div className="bg-blue-200 rounded-xl text-[10px] px-2 w-fit">
                  {date}
                </div>
              </div>
              {message?.map((msg, i) => (
                <div
                  key={msg.chatId}
                  className={`flex ${
                    msg.senderEmail === user?.email
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[75%] px-3 py-2 my-1 rounded-lg text-sm relative ${
                      msg.senderEmail === user?.email
                        ? "bg-[#cc00ff] text-white rounded-br-none"
                        : "bg-white text-gray-800 rounded-bl-none before:content-[''] before:absolute before:top-0 before:-left-2 before:w-0 before:h-0 before:border-t-10 before:border-t-white  before:border-r-transparent"
                    }`}
                  >
                    <p>{msg.text}</p>
                    <div className="flex items-center text-[10px]  text-right opacity-70 mt-1">
                      {msg.time}
                      {msg.senderEmail === user?.email &&
                        msg.status === "send" && (
                          <span className="text-gray-800">
                            <GoCheck size={20} />
                          </span>
                        )}
                      {msg.senderEmail === user?.email &&
                        msg.status === "delivered" && (
                          <span
                            className={`${msg.isRead ? "text-cyan-300" : "text-black"}`}
                          >
                            <LiaCheckDoubleSolid size={20} />
                          </span>
                        )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
      </div>

      <div className="h-14 mb-1 flex justify-between w-full">
        <input
          type="text"
          onChange={handleChange}
          value={message}
          placeholder="Type a message"
          className="bg-white p-1 ml-2 border border-slate-200 w-[90%] focus:outline-[#cc00ff] rounded-xl"
        />
        <Button
          sx={{
            height: 54,
            width: 54,
            backgroundColor: "#cc00ff",
            borderRadius: "10%",
            color: "white",
            marginRight: "11px",
            "& .MuiTouchRipple-child": {
              backgroundColor: "white",
            },
          }}
          onClick={handleSend}
        >
          <MdOutlineSend size={25} />
        </Button>
      </div>
      {(isCalling || isDialed) && (
        <CallAction
          isVideoCallDial={isVideoCallDial}
          setIsVideoCall={setIsVideoCallDial}
        />
      )}
    </div>
  )
}

export default ChatWindow
