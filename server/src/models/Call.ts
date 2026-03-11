import {Schema,model} from "mongoose"
import { CallInterface } from "../types/type"
const CallSchema = new Schema<CallInterface>({
    callerEmail:{type:String,required:true, index:true},
    callType:{type:String,enum:["voice","video"],required:true,},
    callDuration:Number,
    recipientEmail: {type:String,required:true,index:true},
    dateTime:{type:Date, required:true},
    status:{type:String, enum:["accepted","rejected","ringing","ended"],required:true},
    callId:String
})
const Call = model("Call",CallSchema)
export default Call