"use client"
import { Badge, Button } from "@mui/material"
import { PiPhoneCallFill } from "react-icons/pi"
import { IoIosChatbubbles } from "react-icons/io"
import React, { useState } from "react"
import Link from "next/link"
import { useSocket } from "../context/SocketContextProvider"

const MobileBar: React.FC<{ page: string }> = ({ page }) => {
  const { totalUnreadCount, totalMissedCall } = useSocket()!
  return (
    <div className="w-[80%] p-2  bg-white rounded-2xl shadow shadow-[#cc00ff] fixed bottom-5 transform left-1/2 -translate-x-1/2 flex justify-around items-center md:hidden ">
      <Link href={"/"}>
        <Button
          sx={{
            textAlign: "left",

            display: "flex",
            flexDirection: "column",
            backgroundColor: page === "chats" ? "#cc00ff30" : undefined,
            color: "black",
            width: "50px",
            height: "50px",

            borderRadius: "50%",
            "&:hover": {
              backgroundColor: "#cc00ff10",
            },
            "& .MuiTouchRipple-child": {
              backgroundColor: "#cc00ff",
            },
          }}
        >
          <Badge badgeContent={totalUnreadCount} color="primary">
            <IoIosChatbubbles size={18} color="#cc00ff" />
          </Badge>
          <span className="ml-1 text-[9px]">Chats</span>
        </Button>
      </Link>
      <div className="w-0.5 h-12.5 my-2 bg-slate-200"></div>
      <Link href={"/calls"}>
        <Button
          sx={{
            textAlign: "left",
            display: "flex",
            flexDirection: "column",
            backgroundColor: page === "calls" ? "#cc00ff30" : undefined,
            color: "black",
            width: "50px",
            height: "50px",
            fontSize: "15px",
            borderRadius: "50%",
            "&:hover": {
              backgroundColor: "#cc00ff10",
            },
            "& .MuiTouchRipple-child": {
              backgroundColor: "#cc00ff",
            },
          }}
        >
          <Badge badgeContent={totalMissedCall} color="primary">
            <PiPhoneCallFill size={18} color="#cc00ff" />
          </Badge>
          <span className="ml-1 text-[9px]">Calls</span>
        </Button>
      </Link>
    </div>
  )
}

export default MobileBar
