import Image from "next/image"
import SideBar from "./Components/SideBar"
import Chatlist from "./Components/Chatlist"
import MobileBar from "./Components/MobileBar"
import ProtectedRouter from "./Components/ProtectedRouter"

export default function Home() {
  return (
    <ProtectedRouter>
      <main className="h-full md:flex w-full">
        <SideBar page="chats" />
        <Chatlist />
        <MobileBar page="chats" />
      </main>
    </ProtectedRouter>
  )
}
