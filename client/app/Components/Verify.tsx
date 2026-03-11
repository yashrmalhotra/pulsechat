"use client"
import { CircularProgress } from "@mui/material"
import axios from "axios"
import Link from "next/link"
import React, { useEffect, useState } from "react"

const Verify: React.FC<{ code: string }> = ({ code }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [email, setEmail] = useState<boolean>(false)

  useEffect(() => {
    ;(async () => {
      try {
        setIsLoading(true)
        const {data} = await axios.put(`/api/auth/verify/${code}`)
        
        setEmail(data?.email)
      } finally {
        setIsLoading(false)
      }
    })()
  }, [])
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      {isLoading ? (
        <div className="w-full flex justify-center ">
          <CircularProgress size={25} />{" "}
        </div>
      ) : (
        <>
          <div className="rounded-[9999px] w-28 h-28 text-center flex items-center text-3xl justify-center text-white bg-green-400">
            ✔
          </div>
          <div className="text-center md:text-2xl">You are verified {email}</div>
          <div> <Link href="/signin" className="underline text-[#597fdf] visited:text-[#cc00ff]">Signin</Link> </div>
        </>
      )}
    </div>
  )
}

export default Verify
