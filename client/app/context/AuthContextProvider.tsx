"use client"
import { AuthContextType, ReactNodeProps, UserDetailsTypes } from "@/Types/type"
import axios from "axios"
import React, { createContext, useContext, useEffect, useState } from "react"
const AuthContext = createContext<AuthContextType | null>(null)

const AuthContextProvider: React.FC<ReactNodeProps> = ({ children }) => {
  const [user, setUser] = useState<UserDetailsTypes | undefined>(undefined)
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(false)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

  useEffect(() => {
    if (isAuthLoading) {
      return
    }

    ;(async () => {
      try {
        setIsAuthLoading(true)
        const res = await axios.get(`/api/auth/getUser`, {
          withCredentials: true,
        })

        setUser(res.data as UserDetailsTypes)
        setIsAuthenticated(true)
      } catch (error) {
        setIsAuthenticated(false)
      } finally {
        setIsAuthLoading(false)
      }
    })()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuthLoading,
        setIsAuthLoading,
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
export const useAuth = () => useContext(AuthContext)

export default AuthContextProvider
