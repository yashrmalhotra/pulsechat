import mongoose from "mongoose"
import "dotenv/config.js"
import authRouter from "./routes/auth-route"
import express from "express"
import cors from "cors"
import cookieparser from "cookie-parser"
import Redis from "ioredis"
import userRouter from "./routes/user-route"
import passport from "passport"
import { Server } from "socket.io"
import http from "http"
import {
  updateChatReadStatus,
} from "./utills/chatDBOperations"
import chatRouter from "./routes/chat"
import { saveCall, updateCallStatus } from "./utills/callDBOperations"
import { callRouter } from "./routes/call-route"
import { updateUserStatus } from "./controllers/userController"
import { connectProducer, producer } from "./kafka/producer"
import { connectConsumer, consumer } from "./kafka/consumer"
import setUpShutDown from "./kafka/shutdown"

const app = express()
export const client = new Redis(process.env.REDIS_URL!)
client.on("connect", () => console.log("redis connected"))
const server = http.createServer(app)
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
)

app.use(cookieparser())
app.use(express.json())
app.use(passport.initialize())
app.use(express.urlencoded({ extended: true }))
mongoose
  .connect(process.env.MONGODB_URI!)
  .then(() => {
    console.log("mongodb connected")
  })
  .catch((e) => {
    console.log(e)
  })

app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/chat", chatRouter)
app.use("/api/call", callRouter)
// -----------------Socket------------------
const init = async () => {
  await connectProducer()
  await connectConsumer()
  const io = new Server(server, {
    cors: {
      origin:  process.env.CLIENT_URL,
      methods: ["GET", "POST"],
      credentials: true,
    },
  })

  io.on("connection", (socket) => {
    socket.on(
      "send-message",
      async ({
        text,
        room,
        senderEmail,
        recipientEmail,
        time,
        date,
        chatId,
        avatar,
        isVerified,
        name,
        username,
      }) => {
        io.to(room).emit("receive-message", {
          text,
          senderEmail,
          recipientEmail,
          time,
          date,
          chatId,
          isRead: false,
        })
        socket
          .to(recipientEmail)
          .emit("new-message", {
            lastMessage: text,
            name,
            username,
            lastDate: date,
            lastTime: time,
            chatId,
            avatar,
            isVerified,
            email: senderEmail,
          })
 
        io.to(senderEmail).emit("markAsSend", chatId, date)
        socket.to(recipientEmail).emit("isDelivered", senderEmail)
        producer.send({topic:"save-chats",messages:[{
          value:JSON.stringify({type:"save-chat",text,senderEmail,recipientEmail,date,time,status:"send",chatId})
        }]})
      },
    )

    socket.on("user-online", async ({ username, email }) => {
      socket.broadcast.emit("user-status", "online")
      await client.set(`status:${email}`, "online")
      socket.data.email = email
      socket.join(email)
    })
    socket.on("user-typing", ({ room, status }) => {
      socket.to(room).emit("user-status", status)
    })

    socket.on("join-room", ({ room }) => {
      socket.join(room)
    })
    
    socket.on("bulkMarkAsDelivered", async ({ recipientEmail }: any) => {
      try {
        
        socket.broadcast.emit("bulkMarkAsDelivered")
        await producer.send({topic:"save-chats",messages:[
          {value:JSON.stringify({type:"update-bulk-delivered-status",recipientEmail})}
        ]})
      } catch (error) {}
    })
    socket.on(
      "markAsDelivered",
      async ({ senderEmail, recipientEmail }: any) => {
        socket.to(senderEmail).emit("markAsDelivered")
         await producer.send({topic:"save-chats",messages:[
          {value:JSON.stringify({type:"update-between-two-delivered-status",recipientEmail,senderEmail})}
        ]})
      },
    )
    socket.on(
      "reading-done",
      async ({ senderEmail, recipientEmail, room, showReadStatus }) => {
        
        if (showReadStatus) {
          socket.to(room).emit("markAsRead")
        }
        await producer.send({topic:"save-chats",messages:[
        {value:JSON.stringify({type:"update-reading-status",recipientEmail,senderEmail})}
      ]})
      },
    )
    // ---------------------------- CALLS ---------------------------------\\
    socket.on(
      "make-call",
      async ({
        callRoom,
        callType,
        callerId,
        callerAvatar,
        callerName,
        callerUsername,
        callerEmail,
        callerVerificationStatus,
        offer,
        recipientEmail,

        callId,
        dateTime,
      }: any) => {
        socket.to(recipientEmail).emit("incoming-call", {
          callerId,
          callerName,
          callerEmail,
          callerUsername,
          callerAvatar,
          callerVerificationStatus,
          dateTime,
          callType,
          offer,
          callId,
          callRoom,
        })

        await producer.send({topic:"save-calls", messages:[
          {value:JSON.stringify({type:"save-call",callType,callerEmail,recipientEmail,dateTime,status:"ringing",callId})}
        ]})
      },
    )
    socket.on("accept-call", async ({ room, answer, callId }) => {
      io.to(room).emit("accept-call", answer)
      await producer.send({topic:"save-calls",messages:[
        {value:JSON.stringify({type:"update-call-status",callId,status:"accepted"})}
      ]})
    })
    socket.on("reject-call", async (room, callId) => {
      socket.to(room).emit("reject-call", false)
        await producer.send({topic:"save-calls",messages:[
        {value:JSON.stringify({type:"update-call-status",callId,status:"rejected"})}
      ]})
    })
    socket.on("hang-up", async ({ room, callDuration, callId }) => {
      io.to(room).emit("hang-up", false)
      await producer.send({topic:"save-calls",messages:[
        {value:JSON.stringify({type:"update-call-status",callId, status:"ended",callDuration})}
      ]})
    })
    socket.on("ice-candidate", ({ room, candidate }) => {
      socket.to(room).emit("ice-candidate", candidate)
    })
    socket.on("disconnecting", async () => {
      const isShowLastSeenEnabled = await client.hget(
        `user:${socket.data.email}`,
        "showLastSeen",
      )
      if (isShowLastSeenEnabled === "true") {
        socket.broadcast.emit("user-status", `last seen-${new Date()}`)
        await updateUserStatus({ email: socket.data.email })
      } else {
        socket.broadcast.emit("user-status", "")
      }
      await client.del(`status:${socket.data.email}`)
    })
  })

  server.listen(3001, () => {
    console.log("server listen at http://localhost:3001/api")
  })
  await setUpShutDown(producer,consumer,server)
}
init()
