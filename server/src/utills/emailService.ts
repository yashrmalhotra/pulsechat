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
  try {
     await transporter.sendMail(
    {
      from: `PulseChat ${process.env.EMAIL}`,
      to: email,
      subject: "Verification Email",
      html: `<p>Please click on the link <a href=${process.env.CLIENT_URL}/verify/${code} style="color:blue; text-decoration: underline; font-weight:bold;">Click here to verify</a>`,
    })
    console.log("email sent successfully")
  } catch (error:any) {
    console.log("email error",error)
    throw new Error(error.message)
  }
}