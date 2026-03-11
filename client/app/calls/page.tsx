import Image from "next/image"
import SideBar from "../Components/SideBar"
import CallLogs from "../Components/Calllogs"
import MobileBar from "../Components/MobileBar"
import ProtectedRouter from "../Components/ProtectedRouter"
import { Metadata } from "next"
const page = ()=>{
  return (
    <ProtectedRouter>
      <main className="h-full flex w-full">
        <SideBar page="calls" />
        <CallLogs />
        <MobileBar page="calls" />
      </main>
    </ProtectedRouter>
  )
}

export const metadata:Metadata = {
  title:"PulseChat - CallLogs"
}
export default page