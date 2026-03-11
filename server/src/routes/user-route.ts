import { authentication } from "../middlewares/auth-middleware"
import express from "express"
import {  upload } from "../utills/fileService"
import { searchUser, storeUserAvatar, userSettings } from "../controllers/userController"

const userRouter = express.Router()
userRouter.use(authentication)
userRouter.put("/setting", userSettings)
userRouter.post("/search",searchUser)
userRouter.put(
  "/upload-avatar",
  upload.single("avatar"),
  storeUserAvatar
)
export default userRouter
