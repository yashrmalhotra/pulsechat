"use client"
import { Button } from "@mui/material"
import React, { Suspense, useEffect, useState } from "react"
import { FcGoogle } from "react-icons/fc"
import { Dialog, Typography, CircularProgress } from "@mui/material"
import {  useSearchParams } from "next/navigation"
import { useAuth } from "../context/AuthContextProvider"
import axios from "axios"
const GoogleAuthComponent = () => {
  const [isError, setIsError] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const {setUser,setIsAuthenticated} = useAuth()!
  const query = useSearchParams()
  
  useEffect(()=>{
    (
     async ()=>{ 
      const params = query.get("token")
       if(!params) return
      const token = decodeURI(params)
      try {
        setIsLoading(true)
        const {data} = await axios.get(`/api/auth/getoauthuser?token=${token}`,{
          withCredentials:true
        })
        setUser(data.user)
        setIsAuthenticated(true)
      } catch (error) {
        setIsError(true)
      }finally{
        setIsLoading(false)
      }
     }
    )()

  },[])
  const handleLogin = () => {
    
    window.location.href = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/googleauth`
  }
  return (
    <>
      <Dialog
        open={isError}
        onClose={() => setIsError(false)}
        slotProps={{
          paper: {
            sx: {
              width: "90%",
              padding: "30px",
            },
          },
        }}
      >
        <Typography sx={{ fontWeight: "bold" }}>
          Something went wrong!
        </Typography>
      </Dialog>

      <Button
        onClick={handleLogin}
        className="w-full p-1 rounded-2xl mt-1 active:bg-gray-300 cursor-pointer flex justify-center items-center gap-3 bg-white border border-[#dadce0]"
        sx={{
          width: "100%",
          padding: "4px",
          marginTop: "4px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "1px solid #dadce0",
          gap: "4px",
          background: "white",
          color: "black",
          textTransform: "none",
          borderRadius: "16px",
        }}
      >
        {isLoading ? (
          <CircularProgress size={20} sx={{ color: "#ffcc00" }} />
        ) : (
          <>
            {" "}
            <FcGoogle size={22} />{" "}
            <span className="font-medium">Continue with google</span>{" "}
          </>
        )}
      </Button>
    </>
  )
}
const GoogleAuth = ()=>{
  return <Suspense fallback={null}>
    <GoogleAuthComponent/>
  </Suspense>
}
export default GoogleAuth
