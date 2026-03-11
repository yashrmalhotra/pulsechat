import React from "react"
import SignupForm from "../Components/SignUpForm"
import { Metadata } from "next"

const page = () => {
  return <SignupForm />
}
export const metadata:Metadata = {
  title:"PulseChat - Signup"
}

export default page
