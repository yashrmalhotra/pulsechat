import Chat from "../models/chat"
import User from "../models/user"
import { Request, Response } from "express"
import { getUserAvatar } from "../utills/fileService"
import {client} from "../server"
import Call from "../models/Call"
export const getChats = async (req: Request, res: Response) => {
  const { email } = req.query
  try {
    const chats = await Chat.aggregate([
      { $match: { $or: [{ recipientEmail: email }, { senderEmail: email }] } },
      { $sort: {date: -1} },
      {
        $addFields: {
          otherEmail: {
            $cond: [
              { $eq: ["$senderEmail", email] },
              "$recipientEmail",
              "$senderEmail",
            ],
          },
        },
      },
      {
        $group: {
          _id: "$otherEmail",
          lastMessage: { $first: "$text" },
          lastTime: { $first: "$time" },
          lastDate: { $first: "$date" },
          lastChatId: { $first: "$chatId" },
          lastChatStatus: { $first: "$status" },
          unreadCount:{
            $sum:{
              $cond:[
                {
                  $and:[
                    {$eq:["$recipientEmail",email]},
                    {$eq:["$isRead",false]}
                  ]
                },1,0
              ]
            }
          }
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "email",
          as: "user",
        }
      },
      { $unwind: "$user" },

      {
        $project: {
          _id: "$user._id",
          email: "$user.email",
          name: "$user.name",
          username: "$user.username",
          avatar: "$user.avatar",
          isVerified: "$user.verificationStatus",
          lastMessage: 1,
          lastTime: 1,
          lastDate: 1,
          lastChatId:1,
          lastChatStatus:1,
          unreadCount:1,
        },
      },
      {$sort:{lastDate:-1}}
    ])
    await Promise.all(
        chats.map(async (chat)=>{
            if(chat.avatar){
                const file = await getUserAvatar(chat._id.toString())
                chat.avatar = file
              ? `data:${file.file.metadata.contentType};base64,${file.buffer.toString(
                  "base64",
                )}`
              : null
            }
        })
    )
   const totalUnreadCount = chats.reduce((acc, chat) => acc + (chat.unreadCount || 0),0)
    res.json({ chats: chats,totalUnreadCount })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}
export const getRecipientChat = async (req: Request, res: Response) => {
  try {
    const { recipient, user} = req.query
    const recipientDetails = await User.findOne({ username: recipient as string }).select(
      "-password -verficationCode -authStrategy",
    ).lean()!
    const chats = await Chat.find({$or:[
      {senderEmail:user, recipientEmail:recipientDetails?.email},
      {senderEmail:recipientDetails?.email as string, recipientEmail:user},
    ]}).sort({createdAt:1}).lean()
    console.log("recipientDetails?.showReadStatus",recipientDetails?.showReadStatus)
    if(!recipientDetails?.showReadStatus){

       chats.forEach((chat)=>{
         delete chat.isRead
       })
    }

    const file = await getUserAvatar(recipientDetails?._id.toString() as string)
    if (file && recipientDetails?.avatar) {
      recipientDetails.avatar = `data:${file.file.metadata.contentType};base64,${file.buffer.toString(
        "base64",
      )}`
    }
    let status = await client.get(`status:${recipientDetails?.email}`)
    if(!status){
       if(recipientDetails?.showLastSeen && recipientDetails?.lastSeen){
         status = `last seen-${recipientDetails?.lastSeen}`
       }
    }

    res.json({ recipient:recipientDetails, chats,status })
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: "Something went wrong" })
  }
}