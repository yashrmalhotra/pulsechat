import React from "react"
import SignInForm from "../Components/SignInForm"
import { Metadata } from "next"

const page = () => {
  return <SignInForm />
}
export const metadata:Metadata = {
  title:"PulseChat - Signin"
}
export default page
