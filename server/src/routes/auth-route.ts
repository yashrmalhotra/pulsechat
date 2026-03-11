import express, { Request, Response } from "express"
import { authentication } from "../middlewares/auth-middleware"
import passport from "passport"
import { getUserData, googleAuthCallback, logOut, signIn, signUp, verifyUser } from "../controllers/authController"


const router = express.Router()
router.post("/signup", signUp)
router.put("/verify/:code", verifyUser)
router.get("/googleauth",passport.authenticate("google",{
    scope:["profile","email"]
}))
passport.authenticate("google", { session: false })
router.get("/google/callback",passport.authenticate("google",{
    session:false,
    failureRedirect:"http://localhost:3000/signin"
}),googleAuthCallback)
router.post("/signin", signIn)

router.use(authentication)
router.get("/getUser", getUserData)
router.delete("/logout", logOut)

export default router
