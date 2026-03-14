"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../middlewares/auth-middleware");
const passport_1 = __importDefault(require("passport"));
const authController_1 = require("../controllers/authController");
const router = express_1.default.Router();
router.post("/signup", authController_1.signUp);
router.put("/verify/:code", authController_1.verifyUser);
router.get("/googleauth", passport_1.default.authenticate("google", {
    scope: ["profile", "email"]
}));
passport_1.default.authenticate("google", { session: false });
router.get("/google/callback", passport_1.default.authenticate("google", {
    session: false,
    failureRedirect: "http://localhost:3000/signin"
}), authController_1.googleAuthCallback);
router.post("/signin", authController_1.signIn);
router.get("/getoauthuser", authController_1.getOauthUser);
router.use(auth_middleware_1.authentication);
router.get("/getUser", authController_1.getUserData);
router.delete("/logout", authController_1.logOut);
exports.default = router;
//# sourceMappingURL=auth-route.js.map