import Call from "../models/Call";
import { CallInterface } from "../types/type";
export const saveCall = async (callDetails:CallInterface)=>{
    try {
        await Call.create(callDetails)
    } catch (error) {
        console.log(error)
    }
}
export const updateCallStatus = async (callId:string, status:string, callDuration?:number)=>{
     
    try {
        await Call.updateOne({callId},{$set:{status, callDuration}})
    } catch (error) {
        console.log(error)
    }
}