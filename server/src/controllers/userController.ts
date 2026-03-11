import User from "../models/user"
import { Request, Response } from "express"
import {
  deleteOldAvatarIfExist,
  getGfs,
  getUserAvatar,
  upload,
} from "../utills/fileService"
import { client } from "../server"
import Chat from "../models/chat"
export const userSettings = async (req: Request, res: Response) => {
  const { email, field, value } = req.body

  try {
    if (field === "username") {
      const user = await User.findOne({ username: value }).select("username")
      if (user) {
        throw new Error("Username already exist")
      }
    }
    await User.updateOne({ email }, { [field]: value })
    console.log("req?.user?.email", req?.user?.identifier)
    await client.hset(`user:${req?.user?.identifier}`, field, value)
    res.json({ success: true })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}
export const storeUserAvatar = async (req: Request, res: Response) => {
  if (!req.file) {
    res.status(400).json({ message: "No image uploaded" })
  } else {
    await deleteOldAvatarIfExist(req?.user?.id)
    const gfs = getGfs()
    const fileName = Date.now() + "-" + req?.user?.id + req.file.originalname
    const uploadStream = gfs.openUploadStream(fileName, {
      metadata: {
        contentType: req.file.mimetype,
        identifier: req.user?.id, // optional
        fileName,
      },
    })
    uploadStream.end(req.file.buffer)
    uploadStream.on("error", (e) => {
      console.log("err", e)
    })
    uploadStream.on("finish", async () => {
      try {
        await client.del(`user:${req?.user?.identifier}`, (err, response) => {
          if (err) {
            console.error(err)
          }
          if (response === 1) {
            console.log("Deleted Successfully!")
          } else {
            console.log("Key not found or cannot be deleted.")
          }
        })
        await User.updateOne(
          { _id: req?.user?.id },
          { $set: { avatar: fileName } },
        )
        res.json({ success: true })
      } catch (error) {
        console.log(error)
        res.status(400).json({ success: false })
      }
    })
  }
}
export const searchUser = async (req: Request, res: Response) => {
  const { query } = req.body
  try {
    let users = await User.find({
      $or: [
        { username: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
        { name: { $regex: query, $options: "i" } },
      ],
    }).select("name username avatar verificationStatus")
    if (users.length > 0) {
      users = await Promise.all(
        users.map(async (user) => {
          const file = await getUserAvatar(user._id.toString())
          return {
            ...user.toObject(),
            avatar: file
              ? `data:${file.file.metadata.contentType};base64,${file.buffer.toString(
                  "base64",
                )}`
              : null,
          }
        }),
      )
    }
    res.json({ users })
  } catch (error) {
    res.status(400).json({ message: "Something went wrong" })
  }
}

export const updateUserStatus = async ({ email }: any) => {
  try {
    await User.updateOne({ email }, { $set: { lastSeen: new Date() } })
  } catch (error: any) {
    console.log(error)
  }
}
