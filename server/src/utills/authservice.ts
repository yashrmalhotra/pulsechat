import jwt, { JwtPayload } from "jsonwebtoken"
import { AuthPayload } from "../types/type"

const secretKey = "tk"
export const createToken = (payload:{identifier:string,id:string})=>{
 
  return jwt.sign(payload,secretKey,{expiresIn:"24h"})   
}
export const getPayload = (token:string):AuthPayload=>{
    return jwt.verify(token,secretKey) as AuthPayload
}
