"use client"
import { ReactNodeProps } from "@/Types/type"
import React from "react"
import AuthContextProvider from "../context/AuthContextProvider"

const SessionWrapper: React.FC<ReactNodeProps> = ({ children }) => {
  
  
  return <AuthContextProvider>{children}</AuthContextProvider>
}

export default SessionWrapper
