import { Request, Response } from "express"
import User from "../models/user"
import { nanoid } from "nanoid"
import { sendMail } from "../utills/emailService"
import { createToken, getPayload } from "../utills/authservice"
import { client } from "../server"
import bcrypt from "bcrypt"
import { getUserAvatar } from "../utills/fileService"
import passport from "passport"
import { Strategy } from "passport-google-oauth20"
import { getGfs } from "../utills/fileService"
import axios from "axios"
passport.use(
  new Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: "/api/auth/google/callback",
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value!
        const avatarUrl = profile.photos?.[0]?.value

        let user = await User.findOne({ email })
        let filename
        if (!user) {
          const nid = nanoid()!
          user = await User.create({
            email,
            name: profile.displayName!,
            username: "@" + email.split("@")[0]! + nid,
            authStrategy: "google",
            verificationStatus: true,
            googleId: profile.id!,
          })

          if (avatarUrl) {
            filename = Date.now() + "-" + profile.id
            const res = await axios.get(avatarUrl, {
              responseType: "stream",
            })
            const gfs = getGfs()
            const uploadStream = gfs.openUploadStream(
              `${email}-google-avatar`,
              {
                metadata: {
                  contentType: "image/jpeg",
                  identifier: user?._id.toString(), // optional
                  filename,
                },
              },
            )

            res.data.pipe(uploadStream)

            await new Promise((resolve, reject) => {
              uploadStream.on("finish", async () => {
                resolve("google")
              })
              uploadStream.on("error", (e) => {
                console.log("error", e)
                reject()
              })
            })

            user.avatar = filename
            await user.save()
          }
        } else {
          if (!user.googleId) {
            user.googleId = profile.id
            user.authStrategy = "google"
            await user.save()
          }
        }
        await client.hset(`user:${user.email}`, {
          id: user?._id,
          name: user?.name,
          email: user?.email,
          username: user?.username,
          showReadStatus: user?.showReadStatus,
          showLastSeen: user?.showLastSeen,
          avatar: avatarUrl,
        })
        done(null, user)
      } catch (error) {
        done(error as any, undefined)
      }
    },
  ),
)
export const signUp = async (req: Request, res: Response) => {
  const { name, username, email, password } = req.body
  const code = nanoid()!

  try {
    const existingUser = await User.findOne({ email }).select("email")
    if (existingUser) {
      throw new Error("User already exist")
    }
    await User.create({
      name: name,
      username: username,
      email: email,
      password: password,
      authStrategy: "local",
      verificationCode: code,
    })
    res.json({ success: true })
    await sendMail(email, code)
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message })
  }
}
export const signIn = async (req: Request, res: Response) => {
  const { identifier, password } = req.body
  console.log("hi i am from vercel")
  try {
    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    })

    if (!user) {
      throw new Error("User not found")
    } else {
      if (user.authStrategy === "google") {
        throw new Error("Google users cannot login with password")
      }
      const isPasswordCorrect = await bcrypt.compare(
        password,
        user.password as string,
      )
      if (isPasswordCorrect) {
        const token = createToken({ identifier, id: user._id.toString() })

        await client.hset(`user:${user.email}`, {
          id: user?._id,
          name: user?.name,
          email: user?.email,
          username: user?.username,
          showReadStatus: user?.showReadStatus,
          showLastSeen: user?.showLastSeen,
          avatar: user?.avatar,
        })
        res.cookie("token", token, {
          maxAge: 1000 * 3600 * 24,
          httpOnly: true,
          domain: process.env.DOMAIN,
          path: "/",
          secure: true,
        })
        res.json({
          name: user.name,
          email: user.email,
          username: user.username,
        })
      } else {
        throw new Error("Password is wrong")
      }
    }
  } catch (error: any) {
    console.log(error)
    res.status(500).json({ message: error.message })
  }
}
export const googleAuthCallback = async (req: Request, res: Response) => {
  const token = await createToken({
    identifier: req?.user?.email,
    id: req?.user?._id.toString()!,
  })
  res.cookie("token", token, {
    maxAge: 1000 * 3600 * 24,
    httpOnly: true,
    domain: process.env.DOMAIN,
    path: "/",
    secure: true,
  })
  res.redirect(process.env.CLIENT_URL!)
}
export const verifyUser = async (req: Request, res: Response) => {
  const verificationCode = req.params.code as any

  try {
    const user = await User.findOneAndUpdate(
      { verificationCode },
      { verificationStatus: true },
    )!
    res.json({ success: true, email: user?.email })
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" })
  }
}
export const getUserData = async (req: Request, res: Response) => {
  const token = req.cookies.token
  if (token) {
    const payload = getPayload(token)
    try {
      const cachedUser = await client.hgetall(`user:${payload.identifier}`)
      const file = await getUserAvatar(payload.id)
      if (Object.keys(cachedUser).length > 0) {
        res.json({
          id: cachedUser?._id,
          name: cachedUser?.name,
          email: cachedUser?.email,
          username: cachedUser?.username,
          showReadStatus: cachedUser?.showReadStatus === "true",
          showLastSeen: cachedUser?.showLastSeen === "true",
          avatar: cachedUser?.avatar,
        })
      } else {
        const user = await User.findById(payload.id).select(
          "name email username showLastSeen showReadStatus avatar publicKey",
        )
        await client.hset(`user:${user?.email}`, {
          id: user?._id,
          name: user?.name,
          email: user?.email,
          username: user?.username,
          showReadStatus: user?.showReadStatus,
          showLastSeen: user?.showLastSeen,
          avatar: `data:${file?.file?.metadata?.contentType};base64,${file?.buffer.toString("base64")}`,
        })
        await client.expire(`user:${user?.email}`, 3600 * 24)
        res.json({
          id: user?._id,
          name: user?.name,
          email: user?.email,
          username: user?.username,
          showReadStatus: user?.showReadStatus,
          showLastSeen: user?.showLastSeen,
          avatar: `data:${file?.file?.metadata?.contentType};base64,${file?.buffer.toString("base64")}`,
        })
      }
    } catch (error: any) {
      console.log(error)
      res.status(500).json({ message: error?.message })
    }
  } else {
    res.status(401).send("unauthenticated")
  }
}

export const logOut = async (req: Request, res: Response) => {
  await client.del(`user:${req?.user?.email}`)
  res
    .clearCookie("token", {
      httpOnly: true,
      domain: process.env.DOMAIN,
      path: "/",
      secure: true,
    })
    .send("logged out")
}
