"use client"
import React, { useRef, useState } from "react"
import { Avatar, Box, Button, IconButton } from "@mui/material"
import Link from "next/link"
import axios from "axios"
import { SearchList, UserList } from "@/Types/type"
import ChatCallListLoader from "./ChatCalllistLoader"
import { TiTick } from "react-icons/ti"
const SearchChatList: React.FC<SearchList> = ({ isLoading, users }) => {
  if (isLoading) {
    return <ChatCallListLoader />
  }

  return (
    <ul className="w-full pt-4">
      {users.length > 0 ? (
        users.map((user: UserList) => (
          <Link
            key={user._id}
            href={`/chat/${user.username}`}
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
                  gap: "8px",
                  justifyContent: "space-between",
                  "&:hover": {
                    backgroundColor: "#cc00ff10",
                  },
                  "& .MuiTouchRipple-child": {
                    backgroundColor: "#cc00ff",
                  },
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
                  <Avatar
                    src={user.avatar ?? undefined}
                    sx={{ width: 40, height: 40 }}
                  />
                  <div>
                    <span className="font-bold ">{user.name}</span>
                    {user.verificationStatus && (
                      <div className="rounded-full inline-flex justify-center items-center w-3 h-3 bg-blue-400 text-white">
                        <TiTick />
                      </div>
                    )}
                  </div>
                </Box>
              </Button>
            </li>
          </Link>
        ))
      ) : (
        <div className="w-full">No user found</div>
      )}
    </ul>
  )
}

export default SearchChatList
