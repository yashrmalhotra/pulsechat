"use client"
import { SignInFormSchema } from "@/Types/type"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Input from "./Input"
import { IoIosEye, IoIosEyeOff } from "react-icons/io"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, CircularProgress, IconButton } from "@mui/material"
import axios from "axios"
import { useAuth } from "../context/AuthContextProvider"
import { useRouter } from "next/navigation"
import GoogleAuth from "./GoogleAuth"
type SignIn = z.infer<typeof SignInFormSchema>
const SignInForm = () => {
  const [passwordVisible, setPasswordVisible ] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()
  const { setUser, isAuthenticated, user,setIsAuthenticated} = useAuth()!
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignIn>({
    defaultValues: {
      identifier: "",
      password: "",
    },
    resolver: zodResolver(SignInFormSchema),
  })

  const handlePasswordVisible = () => {
    setPasswordVisible(!passwordVisible)
  }
  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/")
    }
  }, [isAuthenticated, user])
  const submit = async (data: any) => {
    try {
      setIsLoading(true)
      const res = await axios.post(`/api/auth/signin`, data, {
        withCredentials: true,
      })
      setUser(res.data)
      setIsAuthenticated(true)
    } catch (error: any) {
      setError("root", { type: "axios", message: error.response.data.message })
    } finally {
      setIsLoading(false)
    }
  }
  const onSubmit = () => {
    handleSubmit(submit)()
  }
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
  return (
    <div className="w-full h-screen flex justify-center items-center bg-blue-50">
      <div className="w-[80%] mx-2 sm:w-1/2 md:w-1/3  min-h-1/3 p-3 bg-[#cc00ff] rounded-2xl">
        <Input
          labelText="Email"
          mendatory="*"
          placeholder="johndoe@gmail.com"
          register={register("identifier")}
          error={errors.identifier?.message}
        />
        <div className={`flex flex-col h-20`}>
          <label className="font-semibold text-white">
            Password <span className="text-red-400">*</span>
          </label>
          <div className="w-full relative border  flex justify-between  border-[#00ffff] rounded-2xl">
            <input
              type={`${passwordVisible ? "text" : "password"}`}
              {...register("password")}
              placeholder="eg: abcd1234"
              className="p-0.5 md:p-2 h-10 w-[70%] text-white focus:outline-none rounded-2xl"
              autoComplete="off"
            />

            <IconButton
              type="button"
              onClick={handlePasswordVisible}
              sx={{
                padding: "4px",
              }}
            >
              {passwordVisible ? (
                <IoIosEyeOff color="#f5e6ff" size={25} />
              ) : (
                <IoIosEye color="#f5e6ff" size={25} />
              )}
            </IconButton>
          </div>
          {errors.password && (
            <div className="text-red-500 font-bold">
              {errors.password.message}
            </div>
          )}
        </div>
        <Button
          onClick={onSubmit}
          disabled={isLoading}
          sx={{
            width: "100%",
            padding: "4px",
            background: "oklch(49.6% 0.265 301.924)",
            "&:disabled": {
              bgcolor: "gray",
            },
            marginTop: "8px",
            borderRadius: "16px",
            textAlign: "center",
            color: "white",
            textTransform: "none",
          }}
        >
          {isLoading ? (
            <CircularProgress size={20} sx={{ color: "#ffcc00" }} />
          ) : (
            <span>Submit</span>
          )}
        </Button>
        {errors.root && (
          <div className="text-red-500 font-bold">{errors.root.message}</div>
        )}
        <div className="mt-1 text-white text-center">
          <span>Don't have an account?</span>&nbsp;
          <Link href="/signup" className="underline text-gray-300">
            Sign Up
          </Link>
        </div>

        <div className="flex items-center">
          <div className="grow border-t border-gray-300"></div>
          <span className="mx-4 font-medium">OR</span>
          <div className="grow border-t border-gray-300"></div>
        </div>

        <GoogleAuth />
      </div>
    </div>
  )
}

export default SignInForm
