import express from "express"
import { getRecentCalls } from "../controllers/callControllers"
export const callRouter = express.Router()
callRouter.get("/",getRecentCalls)