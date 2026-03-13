import { Kafka } from "kafkajs"
import {
  saveChat,
  updateChatDeliveredStatus,
  updateChatBetweenTwoDeliveredStatus,
  updateChatReadStatus,
} from "../utills/chatDBOperations"
import { saveCall, updateCallStatus } from "../utills/callDBOperations"
const ca = process.env.KAFKA_CA?.replace(/\\n/g,"\n")
const kafka = new Kafka({
  clientId: "chat-consumer",
  brokers: [process.env.KAFKA_URL!],
  ssl:{
    rejectUnauthorized:true,
    ca:[ca!]
  },
  sasl:{
    username:process.env.KAFKA_USERNAME!,
    password:process.env.KAFKA_PASSWORD!,
    mechanism:"plain"
  }
})
export const consumer = kafka.consumer({ groupId: "chat-group-v3" })
export const connectConsumer = async () => {
  try {
    await consumer.connect()
    await consumer.subscribe({ topic: "save-chats", fromBeginning: true })
    await consumer.subscribe({ topic: "save-calls", fromBeginning: true })
    console.log("consumer connected successfully")
    await consumer.run({
      eachMessage: async ({ topic, message }) => {
        if (!message.value) return
        const event = JSON.parse(message.value!.toString())
        const {
          type,
          text,
          senderEmail,
          recipientEmail,
          date,
          time,
          status,
          chatId,
        } = event
        if (topic === "save-chats") {
          switch (type) {
            case "save-chat":
              try {
                await saveChat({
                  text,
                  senderEmail,
                  recipientEmail,
                  date,
                  time,
                  status,
                  chatId,
                })
              } catch (error) {
                consumer.pause([{ topic }])
                setTimeout(() => {
                  consumer.resume([{ topic }])
                }, 5000)
                console.log(error)
              }
              break
            case "update-bulk-delivered-status":
              try {
                await updateChatDeliveredStatus(recipientEmail)
              } catch (error) {
                consumer.pause([{ topic }])
                setTimeout(() => {
                  consumer.resume([{ topic }])
                }, 5000)
                console.log(error)
              }
              break
            case "update-between-two-delivered-status":
              try {
                await updateChatBetweenTwoDeliveredStatus({
                  senderEmail,
                  recipientEmail,
                })
              } catch (error) {
                consumer.pause([{ topic }])
                setTimeout(() => {
                  consumer.resume([{ topic }])
                }, 5000)
                console.log(error)
              }
              break
            case "update-reading-status":
              try {
                await updateChatReadStatus({ recipientEmail, senderEmail })
              } catch (error) {
                consumer.pause([{ topic }])
                setTimeout(() => {
                  consumer.resume([{ topic }])
                }, 5000)
                console.log(error)
              }
              break
          }
        }
        if (topic === "save-calls") {
          const event = JSON.parse(message.value.toString())
          const {
            type,
            callType,
            callerEmail,
            recipientEmail,
            dateTime,
            status,
            callId,
            callDuration,
          } = event
          switch (type) {
            case "save-call":
              try {
                await saveCall({
                  callType,
                  callerEmail,
                  recipientEmail,
                  dateTime,
                  callId,
                  status,
                })
              } catch (error) {
                consumer.pause([{ topic }])
                setTimeout(() => {
                  consumer.resume([{ topic }])
                }, 5000)
                console.log("error", error)
              }
              break
            case "update-call-status":
              try {
                await updateCallStatus(callId, status, callDuration)
              } catch (error) {
                consumer.pause([{ topic }])
                setTimeout(() => {
                  consumer.resume([{ topic }])
                }, 5000)
                console.log(error)
              }
          }
        }
      },
    })
  } catch (error) {
    console.log(error)
  }
}
