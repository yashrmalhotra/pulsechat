import { JwtPayload } from "jsonwebtoken" // or your payload type
import { Socket } from "socket.io"
import { AuthPayload } from "./type"
declare global {
  namespace Express {
    interface Request {
      user?: AuthPayload | any
    }
  }
 
}

export {}
