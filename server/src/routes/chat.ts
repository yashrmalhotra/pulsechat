import express from "express"
import { getChats,getRecipientChat} from "../controllers/chatController"
import { authentication } from "../middlewares/auth-middleware"
const chatRouter = express.Router()
chatRouter.use(authentication)
chatRouter.get("/",getChats)
chatRouter.get("/recipient-chat",getRecipientChat)
export default chatRouter