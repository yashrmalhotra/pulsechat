"use client"
import { usePathname, useRouter } from "next/navigation"
import React, { useState } from "react"
import { FaVideo, FaVideoSlash, FaMicrophone } from "react-icons/fa"
import { useSocket } from "../context/SocketContextProvider"
import { IconButton } from "@mui/material"
import { ImPhoneHangUp } from "react-icons/im"
import { IoCall } from "react-icons/io5"
const IncomingCallPopup = () => {
  const {
    isCalling,
    recipientDetails,
    callRoom,
    isDialed,
    currentCallId,
    isCallAccepted,
    callerDetails,
    room,
    callDuration,
    endCall,
    socket,
    handleIncomingCallAccept,
    handleIncomingCallReject,
  } = useSocket()!
  const router = useRouter()
  const pathname = usePathname()
  const formatTimer = () => {
    const min = Math.floor(callDuration / 60)
    const sec = Math.floor(callDuration % 60)
    return `${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`
  }
  const handleHangUp = () => {
    socket.current.emit("hang-up", {
      room: callRoom.current,
      callDuration,
      callId: currentCallId,
    })
    endCall()
  }

  return (
    isCalling &&
    !pathname.startsWith("/chat") && (
      <div
        onClick={() =>
          router.push(
            `chat/${callerDetails?.callerUsername || recipientDetails?.username}`,
          )
        }
        className="fixed z-10 top-0 bg-green-500 w-full min-h-7 p-1 text-white flex justify-around items-center"
      >
        <IconButton
          onClick={isCallAccepted ? handleHangUp : handleIncomingCallReject}
          sx={{
            background: "red",
            width: "30px",
            color: "white",
            height: "30px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            "&:hover": {
              bgcolor: "red",
            },
          }}
        >
          <IoCall />
        </IconButton>
        <div className="flex items-center">
          {callerDetails?.callType === "video" ? <FaVideo /> : <FaMicrophone />}
          &nbsp;&nbsp;
          {callerDetails?.callerName ? (
            <span>
              {callerDetails?.callerName}{" "}
              {!isCallAccepted ? "is calling..." : formatTimer()}
            </span>
          ) : (
            <span>
              {!isCallAccepted && "Dialing to"} {recipientDetails?.name}{" "}
              {isCallAccepted && formatTimer()}
            </span>
          )}
        </div>
        {!isDialed && !isCallAccepted && (
          <IconButton
            onClick={handleIncomingCallAccept}
            sx={{
              background: "green",
              width: "30px",
              color: "white",
              height: "30px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              "&:hover": {
                bgcolor: "green",
              },
            }}
          >
            <IoCall />
          </IconButton>
        )}
      </div>
    )
  )
}

export default IncomingCallPopup
