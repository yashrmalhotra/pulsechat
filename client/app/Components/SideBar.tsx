"use client"
import { Badge, Button } from "@mui/material"
import { PiPhoneCallFill } from "react-icons/pi"
import { IoIosChatbubbles } from "react-icons/io"
import React, { useState } from "react"
import Link from "next/link"
import { useSocket } from "../context/SocketContextProvider"

const SideBar: React.FC<{ page: string }> = ({ page }) => {
  const { totalUnreadCount, totalMissedCall } = useSocket()!

  return (
    <div className="w-1/5 hidden md:block pt-4 border-r h-full border-slate-200">
      <Link href={"/"}>
        <Button
          sx={{
            textAlign: "left",

            display: "inline",
            backgroundColor: page === "chats" ? "#cc00ff30" : undefined,
            color: "black",
            width: "100%",
            height: "62.5px",
            "&:hover": {
              backgroundColor: "#cc00ff10",
            },
            "& .MuiTouchRipple-child": {
              backgroundColor: "#cc00ff",
            },
          }}
        >
          {totalUnreadCount > 0 ? (
            <Badge badgeContent={totalUnreadCount} color="primary">
              <IoIosChatbubbles size={25} color="#cc00ff" />
            </Badge>
          ) : (
            <IoIosChatbubbles size={25} color="#cc00ff" className="inline" />
          )}
          <span className="ml-1">Chats</span>
        </Button>
      </Link>
      <Link href={"/calls"}>
        <Button
          sx={{
            textAlign: "left",
            display: "inline",
            backgroundColor: page === "calls" ? "#cc00ff30" : undefined,
            marginTop: "12px",
            color: "black",
            width: "100%",
            height: "62.5px",
            "&:hover": {
              backgroundColor: "#cc00ff10",
            },
            "& .MuiTouchRipple-child": {
              backgroundColor: "#cc00ff",
            },
          }}
        >
          <Badge badgeContent={totalMissedCall} color="primary">
            <PiPhoneCallFill size={25} color="#cc00ff" />
          </Badge>
          <span className="ml-1">Calls</span>
        </Button>
      </Link>
    </div>
  )
}

export default SideBar
