"use client"
import { ReactNodeProps } from "@/Types/type"
import React, { useEffect } from "react"
import { useAuth } from "../context/AuthContextProvider"
import { CircularProgress } from "@mui/material"
import { useRouter } from "next/navigation"
const ProtectedRouter: React.FC<ReactNodeProps> = ({ children }) => {
  const { isAuthLoading, isAuthenticated} = useAuth()!
  const router = useRouter()
  
  useEffect(() => {
    
    if (!isAuthenticated && !isAuthLoading) {
      router.replace("/signin")
    }
   
  }, [isAuthLoading, isAuthenticated, router])
  if (isAuthLoading) {
    return (
      <div className="flex w-full h-screen justify-center items-center">
        <CircularProgress
          size={35}
          sx={{
            color: "#cc00ff",
          }}
        />
      </div>
    )
  }
  if (!isAuthenticated) {
    return null
  }
  return <>{children}</>
}

export default ProtectedRouter
