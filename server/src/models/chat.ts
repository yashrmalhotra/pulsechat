import { IChat } from "../types/modeltype";
import {model, Schema} from "mongoose"
const ChatSchema = new Schema<IChat>({
    text:{type:String,required:true},
    senderEmail:{type:String,required:true, index:true},
    recipientEmail:{type:String,required:true,index:true},
    time:{type:String,required:true},
    date:{type:String,required:true},
    isRead:{type:Boolean,default:false},
    chatId:String,
    status:String
},{timestamps:true})
const Chat = model("Chat",ChatSchema)
export default Chat

