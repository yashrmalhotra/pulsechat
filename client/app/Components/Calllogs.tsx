"use client"
import { Avatar, Box, Button, Skeleton } from "@mui/material"
import React, { useEffect, useState } from "react"
import { FcMissedCall, FcCallback } from "react-icons/fc"
import SearchBar from "./SearchBar"
import SearchChatCallList from "./SearchChatCallList"
import { IoMdCall } from "react-icons/io"
import CallAction from "./CallAction"
import { CallList, UserList } from "@/Types/type"
import { useAuth } from "../context/AuthContextProvider"
import axios from "axios"
import { useSocket } from "../context/SocketContextProvider"
import { MdVideoCall } from "react-icons/md"
import { TiTick } from "react-icons/ti"
import { useRouter } from "next/navigation"
import { PiPhoneIncomingFill, PiPhoneOutgoingFill } from "react-icons/pi"
const Calllogs = () => {
  const [search, setSearch] = useState("")
  const [showInput, setShowInput] = useState<boolean>(false)
  const [isSearchLoading, setIsSearchLoading] = useState<boolean>(false)
  const [users, setUsers] = useState<UserList[]>([])
  const {
    recentCallList,
    setRecentCallList,
    isCallLogsLoading,
    setIsDialed,
    setIsVideoCallDial,
    setTotalMissedCall,
    setRecipientDetails
  } = useSocket()!
  const { user } = useAuth()!
  const router = useRouter()

  const handleMakeCall = async (callType: string, recipient: Record<string,any>) => {
    setIsDialed(true)
    setIsVideoCallDial(callType === "video")
    setRecipientDetails(recipient)
    router.push(`/chat/${recipient.username}`)
  }
  const callDirection = (direction: "incoming" | "outgoing" | "missed") => {
    if (direction == "outgoing") {
      return <PiPhoneOutgoingFill color="blue" size={20} />
    }
    if (direction === "incoming") {
      return <PiPhoneIncomingFill color="green" size={20} />
    }
    if (direction === "missed") {
      return <FcMissedCall size={20} />
    }
  }
  return (
    <div className="w-full md:w-[85%] relative">
      <div className="w-full md:w-1/2 xl:w-1/3">
        <SearchBar
          setIsSearchLoading={setIsSearchLoading}
          setUsers={setUsers}
          showInput={showInput}
          setShowInput={setShowInput}
        />
      </div>
      {search ? (
        <SearchChatCallList isLoading={isSearchLoading} users={users} />
      ) : isCallLogsLoading ? (
        <ul className="w-full md:w-1/2 xl:w-1/3 pt-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <li key={i} className="flex w-full">
              <Box
                sx={{
                  width: "100%",
                  color: "black",
                  paddingLeft: "8px",
                  display: "flex",
                  textAlign: "left",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    flexShrink: "0",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {/* Avatar Skeleton */}
                  <Skeleton
                    variant="circular"
                    width={40}
                    height={40}
                    animation="wave"
                  />

                  <Box sx={{ ml: 2, width: "100%" }}>
                    {/* Name Skeleton */}
                    <Skeleton
                      variant="text"
                      width="100%"
                      height={25}
                      animation="wave"
                    />

                    {/* Time Skeleton */}
                    <Skeleton
                      variant="text"
                      width="50%"
                      height={20}
                      animation="wave"
                    />
                  </Box>
                </Box>
              </Box>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="w-full md:w-1/2 xl:w-1/3 flex flex-col gap-2 pt-4">
          {recentCallList?.length === 0 ? (
            <div>No Recent Calls</div>
          ) : (
            recentCallList?.map((recentCall, i) => (
              <li key={i} className="flex w-full justify-between items-center">
                <Box
                  sx={{
                    width: "100%",
                    color: "black",
                    paddingLeft: "8px",
                    display: "flex",
                    justifyContent: "space-between",
                    textAlign: "left",
                  }}
                >
                  <Box
                    sx={{
                      flexShrink: "0",
                      width: "70%",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Avatar src={recentCall?.avatar}>
                      {recentCall?.name?.[0].toUpperCase()}&nbsp;{" "}
                    </Avatar>
                    &nbsp;
                    <div className="w-full">
                      <div className="font-bold text-[11px] md:text-base">
                        {recentCall?.name}&nbsp;
                        {recentCall.verificationStatus && (
                          <div className="rounded-full inline-flex justify-center items-center w-3 h-3 md:w-5 md:h-5 bg-blue-400 text-white">
                            <TiTick />
                          </div>
                        )}
                        &nbsp;
                        {recentCall.missedCount > 0 && (
                          <span className="text-red-400">
                            ({recentCall.missedCount})
                          </span>
                        )}
                      </div>
                      <div className="flex items-center md:items-start ">
                        {" "}
                        {callDirection(recentCall.latestCall.direction)}
                        &nbsp;
                        <div className="flex text-gray-400">
                          <div
                            className={`text-[12px] ${recentCall.missedCount > 0 ? "text-red-400" : "text-gray-400"} `}
                          >
                            {new Date(
                              recentCall.latestCall.dateTime,
                            ).toLocaleDateString("en-IN")}
                            <span className="">,</span>
                          </div>
                          <div
                            className={`text-[12px] ${recentCall.missedCount > 0 ? "text-red-400" : "text-gray-400"} `}
                          >
                            {new Date(
                              recentCall.latestCall.dateTime,
                            ).toLocaleTimeString("en-IN", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Box>
                  {recentCall.latestCall.callType === "voice" ? (
                    <Button
                      onClick={() =>
                        handleMakeCall("voice", recentCall)
                      }
                      sx={{
                        bgcolor: "#cc00ff",
                        color: "white",
                        borderRadius: "9999px",
                        minWidth: "25px",
                        height: "25px",
                        padding: 0,
                        "& .MuiTouchRipple-child": {
                          backgroundColor: "#cc00ff",
                        },
                      }}
                    >
                      <IoMdCall />
                    </Button>
                  ) : (
                    <Button
                      onClick={() =>
                        handleMakeCall("video", recentCall)
                      }
                      sx={{
                        bgcolor: "#cc00ff",
                        color: "white",
                        borderRadius: "9999px",
                        minWidth: "25px",
                        height: "25px",
                        padding: 0,
                        "& .MuiTouchRipple-child": {
                          backgroundColor: "#cc00ff",
                        },
                      }}
                    >
                      <MdVideoCall />
                    </Button>
                  )}
                </Box>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  )
}

export default Calllogs
