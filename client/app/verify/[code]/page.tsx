import Verify from "@/app/Components/Verify"
import { Metadata } from "next"
import React from "react"

const page = async ({ params }:{params: Promise<{code:string}>}) => {
    const {code} = await params
    
  return (
    <div>
      <Verify code={code}/>
    </div>
  )
}
export const metadata: Metadata = {
  title: "PulseChat - Veification",
}
export default page
