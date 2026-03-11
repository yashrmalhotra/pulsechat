import mongoose from "mongoose"
import nodemailer from "nodemailer"
import User from "../models/user"

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.APP_PASS,
  },
})

export const sendMail = async (email: string, code: string) => {
  const cooldown = false
  if (cooldown) return
  try {
     await transporter.sendMail(
    {
      from: `Chat-app ${process.env.EMAIL}`,
      to: email,
      subject: "Verification Email",
      html: `<p>Please click on the link <a href=$${process.env.CLIENT_URL}/verify/${code}>Click to verify</a>`,
    },
    async (error:any,emailsuccess:any)=>{
        if(error){
            console.log(error)
        }else{
            console.log("email sent succesfully")
        }
    }
  )
  } catch (error:any) {
    throw new Error(error.message)
  }
}