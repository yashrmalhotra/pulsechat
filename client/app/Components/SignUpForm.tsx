"use client"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { FullSignUpFormSchema } from "@/Types/type"
import { z } from "zod"
import Input from "./Input"
import { IoIosEye, IoIosEyeOff } from "react-icons/io"
import { FcGoogle } from "react-icons/fc"
import Link from "next/link"
import {
  Dialog,
  DialogTitle,
  Typography,
  DialogActions,
  CircularProgress,
  Button,
  IconButton,
} from "@mui/material"
import axios, { AxiosError } from "axios"
import GoogleAuth from "./GoogleAuth"

type SignUpFormSchema = z.infer<typeof FullSignUpFormSchema>
const SignupForm = () => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false)
  const [confirmationPopup, setConfirmationPopup] = useState<boolean>(false)
  const [confirmPasswordVisible, setConfirmPasswordVisible] =
    useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignUpFormSchema>({
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(FullSignUpFormSchema),
  })

  const handlePasswordVisible = () => {
    setPasswordVisible(!passwordVisible)
  }
  const handleConfirmPasswordVisible = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible)
  }
  const submit = async (data: any) => {
    try {
      setIsLoading(true)
      await axios.post(`/api/auth/signup`, data)
      setConfirmationPopup(true)
    } catch (error: any) {
      console.log("error", error.response.data.message)
      setError("root", { type: "axios", message: error.response.data.message })
    } finally {
      setIsLoading(false)
    }
  }
  const onSubmit = () => {
    handleSubmit(submit)()
  }
  return (
    <>
      <div className="w-full h-screen flex justify-center items-center bg-blue-50">
        <div className="w-[80%] mx-2 sm:w-1/2 md:w-1/3  min-h-1/3 p-3 bg-[#cc00ff] rounded-2xl">
          <GoogleAuth/>
          <div className="flex items-center">
            <div className="grow border-t border-gray-300"></div>
            <span className="mx-4 font-medium">OR</span>
            <div className="grow border-t border-gray-300"></div>
          </div>
          <Input
            labelText="Name"
            mendatory="*"
            placeholder="John Doe"
            register={register("name")}
            error={errors.name?.message}
          />{" "}
          <Input
            labelText="UserName"
            mendatory="*"
            placeholder="@JohnDoe"
            register={register("username")}
            error={errors.username?.message}
          />
          <Input
            labelText="Email"
            mendatory="*"
            placeholder="John Doe"
            register={register("email")}
            error={errors.email?.message}
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
                    padding:"4px",
                    "& .MuiTouchRipple-child": {
                      backgroundColor: "#ffffff",
                    }
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
          <div className="flex flex-col h-20">
            <label className="font-semibold text-white">
              Confirm Password <span className="text-red-400">*</span>
            </label>
            <div className="w-full relative border flex justify-between password-input-container  border-[#00ffff] rounded-2xl">
              <input
                type={`${confirmPasswordVisible ? "text" : "password"}`}
                {...register("confirmPassword")}
                placeholder="eg: abcd1234"
                className="p-0.5 md:p-2 rounded-2xl w-[70%] text-white h-10 focus:outline-none"
                autoComplete="off"
              />

              <IconButton
                type="button"
                onClick={handleConfirmPasswordVisible}
                sx={{
                  padding:"4px",
                  "& .MuiTouchRipple-child": {
                      backgroundColor: "#ffffff",
                    }
                }}
              >
                {confirmPasswordVisible ? (
                  <IoIosEyeOff color="#f5e6ff" size={25} />
                ) : (
                  <IoIosEye color="#f5e6ff" size={25} />
                )}
              </IconButton>
            </div>
            {errors.confirmPassword && (
              <div className="text-red-500 font-bold">
                {errors.confirmPassword?.message}
              </div>
            )}
          </div>
          <Button
            onClick={onSubmit}
            disabled={isLoading}
            sx={{
              width:"100%",
              padding:"4px",
              background:"oklch(49.6% 0.265 301.924)",
              "&:disabled":{
                bgcolor:"gray"
              },
              marginTop:"8px",
              borderRadius:"16px",
              textAlign:"center",
              color:"white",
              textTransform:"none"
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
            <span>Already have an account?</span>&nbsp;
            <Link href="/signin" className="underline text-gray-300">
              Sign In
            </Link>
          </div>
        </div>
      </div>
      <Dialog
        slotProps={{
          paper: {
            sx: {
              width: {
                sm: "90%",
                sx: "50%",
                md: "35%",
              },
              minHeight: "100px",
              borderRadius: "25px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "18px",
              padding: "15px",
              textAlign: "center",
            },
          },
        }}
        open={confirmationPopup}
        onClose={() => setConfirmationPopup(false)}
      >
        <Typography>
          We have sent you an email to veify please click on link in mail{" "}
        </Typography>
        <DialogActions
          onClick={() => setConfirmationPopup(false)}
          sx={{
            display: "inline-block",
            bgcolor: "#cc00ff",
            textAlign: "center",
            color: "white",
            paddingInline: 0,
            width: "50px",
          }}
        >
          Ok
        </DialogActions>
      </Dialog>
    </>
  )
}

export default SignupForm
