"use client"
import { Avatar, Box, Button, Skeleton } from "@mui/material"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import SearchBar from "./SearchBar"
import SearchChatList from "./SearchChatCallList"
import { UserList } from "@/Types/type"
import { useSocket } from "../context/SocketContextProvider"
import { TiTick } from "react-icons/ti"
import axios from "axios"
import { useAuth } from "../context/AuthContextProvider"

const Chatlist = () => {
  const [showInput, setShowInput] = useState<boolean>(false)
  const [users, setUsers] = useState<UserList[]>([])
  const [isSearchLoading, setIsSearchLoading] = useState<boolean>(false)
  const { user } = useAuth()!
  const { chatList, setChatList, setTotalUnreadCount, setRecentCallList, setIsCallLogsLoading, setTotalMissedCall } =
    useSocket()!
  const [isLoading, setIsLoading] = useState<boolean>()

  useEffect(() => {
    ;(async () => {
      try {
        setIsLoading(true)
        const res = await axios.get(`/api/chat?email=${user?.email}`)
        setChatList(res.data.chats)
        setTotalUnreadCount(res.data.totalUnreadCount)
     
      } finally {
        setIsLoading(false)
      }
    })()
  }, [])
   useEffect(() => {
    ;(async () => {
      try {
        setIsCallLogsLoading(true)
        const res = await axios.get(`/api/call?email=${user?.email}`, {
          withCredentials: true,
        })
        setRecentCallList(res.data.recentCallers)
        setTotalMissedCall(res.data.totalMissedCalls)
      } finally {
        setIsCallLogsLoading(false)
      }
    })()
  }, [])
  const dateFormater = (date: string) => {
    const dateobj = new Date(Date.now())
    const lastMessage = new Date(date)
    const isToday = dateobj.toDateString() === lastMessage.toDateString()
    if (isToday) {
      return ""
    }

    const formated = lastMessage.toLocaleDateString()
    return formated
  }
  return (
    <div className="w-full md:w-[35%] px-2">
      <SearchBar
        showInput={showInput}
        setShowInput={setShowInput}
        setUsers={setUsers}
        setIsSearchLoading={setIsSearchLoading}
      />
      {showInput ? (
        <div>
          <SearchChatList isLoading={isSearchLoading} users={users} />
        </div>
      ) : chatList.length === 0 ? (
        <div>No recent chats</div>
      ) : isLoading ? (
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
                      width="40%"
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
        chatList.map((chat, i) => (
          <Link
            key={chat._id}
            href={`/chat/${chat.username}`}
            className="w-full"
          >
            <li className="flex w-full">
              <Button
                sx={{
                  width: "100%",
                  color: "black",
                  paddingLeft: "8px",
                  display: "flex",
                  textAlign: "left",
                  justifyContent: "space-between",
                  "&:hover": {
                    backgroundColor: "#cc00ff10",
                  },
                  "& .MuiTouchRipple-child": {
                          backgroundColor: "#cc00ff",
                        }
                }}
              >
                <Box
                  sx={{
                    flexShrink: "0",
                    width: "70%",
                    display: "flex",
                    alignItems: "center",
                    textTransform: "none",
                  }}
                >
                  <Avatar src={chat?.avatar || undefined}>
                    {chat.name[0].toUpperCase()}
                  </Avatar>
                  &nbsp;
                  <div>
                    <span className="font-bold ">{chat.name}</span>&nbsp;
                    {chat.isVerified && (
                      <div className="rounded-full inline-flex justify-center items-center w-3 h-3 bg-blue-400 text-white">
                        <TiTick />
                      </div>
                    )}
                    <div className="w-40 xl:w-52 text-slate-400 text-nowrap overflow-hidden text-ellipsis">
                      {chat.lastMessage}
                    </div>
                  </div>
                </Box>
                <div className="flex flex-col items-center">
                  <div
                    className={`${chat.unreadCount > 0 ? "flex" : "invisible"} bg-[#cc00ff] text-white border bordr-2 font-semibold justify-center items-center w-[35px] h-[35px]  rounded-full`}
                  >
                    {chat.unreadCount}
                  </div>

                  <div
                    className={` bottom-0 ${chat.unreadCount > 0 ? "text-[#cc00ff]" : "text-gray-400"}`}
                  >
                    {dateFormater(chat.lastDate) || chat.lastTime}
                  </div>
                </div>
              </Button>
            </li>
          </Link>
        ))
      )}
    </div>
  )
}

export default Chatlist
