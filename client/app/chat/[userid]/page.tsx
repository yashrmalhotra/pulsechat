import CallAction from "@/app/Components/CallAction"
import ChatWindow from "@/app/Components/ChatWindow"
import ProtectedRouter from "@/app/Components/ProtectedRouter"
import SideBar from "@/app/Components/SideBar"
import { Metadata } from "next"
import React from "react"

const page = async ({ params }: { params: {userid:string} }) => {
  return (
    <ProtectedRouter>
      <main className="h-[92vh] md:h-screen md:flex w-full">
        <SideBar page="chats" />
        <ChatWindow />
      </main>
    </ProtectedRouter>
  )
}
export const metadata: Metadata = {
  title: "PulseChat - Chat",
}
export default page
