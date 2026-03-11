import {Request,Response,NextFunction} from "express"
import { getPayload } from "../utills/authservice"
export const authentication = async (req:Request,res:Response, next:NextFunction)=>{
    const token = req?.cookies?.token
    if(!token){
        res.status(401).json({message:"Unauthenticated"})
    }else{
        const user = getPayload(token)
        
        req.user = user
        next()
    }
}