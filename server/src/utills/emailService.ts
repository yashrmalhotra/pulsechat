import mongoose from "mongoose"
import nodemailer from "nodemailer"
import User from "../models/user"
import {Resend} from "resend"
// --------------- FOR LOCAL OR DOCKER ---------------
// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 465,
//   secure: true,
//   auth: {
//     user: process.env.EMAIL,
//     pass: process.env.APP_PASS,
//   },
// })

// --------------- FOR PRODUCTION ---------------
const resend = new Resend(process.env.RESEND_API_KEY)

export const sendMail = async (email: string, code: string) => {
   // ---------------FOR LOCAL OR DOCKER---------------
  // try {
  //    await transporter.sendMail(
  //   {
  //     from: `PulseChat ${process.env.EMAIL}`,
  //     to: email,
  //     subject: "Verification Email",
  //     html: `<p>Please click on the link <a href=${process.env.CLIENT_URL}/verify/${code} style="color:blue; text-decoration: underline; font-weight:bold;">Click here to verify</a>`,
  //   })
  //   console.log("email sent successfully")
  // } catch (error:any) {
  //   console.log("email error",error)
  //   throw new Error(error.message)
  // }

  // --------------- FOR PRODUCTION ---------------
  const { error } = await resend.emails.send({
    from: process.env.EMAIL!,
    to: email,
    subject: "Verification mail",
    html: `<p>Please click on the link <a href=${process.env.CLIENT_URL}/verify/${code} style="color:blue; text-decoration: underline; font-weight:bold;">Click here to verify</a>`,
  });
  if(error){
    throw new Error(error.message)
  }


}