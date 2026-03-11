"use client"
import { Button } from "@mui/material"
import React from "react"
import { FcGoogle } from "react-icons/fc"

const GoogleAuth = () => {
  const handleLogin = ()=>{
    window.location.href =`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/googleauth`
  }
  return (
    <Button onClick={handleLogin} className="w-full p-1 rounded-2xl mt-1 active:bg-gray-300 cursor-pointer flex justify-center items-center gap-3 bg-white border border-[#dadce0]" sx={{
        width:"100%",
        padding:"4px",
        marginTop:"4px",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        border:"1px solid #dadce0",
        gap:"4px",
        background:"white",
        color:"black",
        textTransform:"none",
        borderRadius:"16px"
        
    }} 
    >
      <FcGoogle size={22} />
      <span className="font-medium">Continue with google</span>
    </Button>
  )
}

export default GoogleAuth
