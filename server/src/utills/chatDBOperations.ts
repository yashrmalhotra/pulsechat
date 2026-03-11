import Chat from "../models/chat"
import { ChatInerface, ChatReadParams } from "../types/type"
export const saveChat = async (chat: ChatInerface) => {
  try {
    await Chat.create(chat)
  } catch (error: any) {
    console.log("error", error)
    throw new Error(error.message)
  }
}
export const updateChatDeliveredStatus = async (recipientEmail: string) => {
  try {
    console.log("rcemail",recipientEmail)
    await Chat.updateMany({recipientEmail},{$set:{status:"delivered"}})
  } catch (error: any) {
    console.log("error", error)
    throw new Error(error.message)
  }
}
export const updateChatBetweenTwoDeliveredStatus = async ({recipientEmail,senderEmail}:any) => {
  try {
    console.log("rcemail",recipientEmail)
    await Chat.updateMany({recipientEmail,senderEmail},{$set:{status:"delivered"}})
  } catch (error: any) {
    console.log("error", error)
    throw new Error(error.message)
  }
}
export const updateChatReadStatus = async ({recipientEmail,senderEmail}:ChatReadParams) => {
  try {
    await Chat.updateMany({recipientEmail,senderEmail},{$set:{isRead:true}})
  } catch (error: any) {
    console.log("error", error)
    throw new Error(error.message)
  }
}


