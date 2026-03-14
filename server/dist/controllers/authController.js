"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logOut = exports.getUserData = exports.verifyUser = exports.googleAuthCallback = exports.signIn = exports.signUp = void 0;
const user_1 = __importDefault(require("../models/user"));
const nanoid_1 = require("nanoid");
const emailService_1 = require("../utills/emailService");
const authservice_1 = require("../utills/authservice");
const server_1 = require("../server");
const bcrypt_1 = __importDefault(require("bcrypt"));
const fileService_1 = require("../utills/fileService");
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const fileService_2 = require("../utills/fileService");
const axios_1 = __importDefault(require("axios"));
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.GOOGLE_CALLBACK_URL}`,
}, async (_accessToken, _refreshToken, profile, done) => {
    try {
        const email = profile.emails?.[0]?.value;
        const avatarUrl = profile.photos?.[0]?.value;
        let user = await user_1.default.findOne({ email });
        let filename;
        if (!user) {
            const nid = (0, nanoid_1.nanoid)();
            user = await user_1.default.create({
                email,
                name: profile.displayName,
                username: "@" + email.split("@")[0] + nid,
                authStrategy: "google",
                verificationStatus: true,
                googleId: profile.id,
            });
            if (avatarUrl) {
                filename = Date.now() + "-" + profile.id;
                const res = await axios_1.default.get(avatarUrl, {
                    responseType: "stream",
                });
                const gfs = (0, fileService_2.getGfs)();
                const uploadStream = gfs.openUploadStream(`${email}-google-avatar`, {
                    metadata: {
                        contentType: "image/jpeg",
                        identifier: user?._id.toString(), // optional
                        filename,
                    },
                });
                res.data.pipe(uploadStream);
                await new Promise((resolve, reject) => {
                    uploadStream.on("finish", async () => {
                        resolve("google");
                    });
                    uploadStream.on("error", (e) => {
                        console.log("error", e);
                        reject();
                    });
                });
                user.avatar = filename;
                await user.save();
            }
        }
        else {
            if (!user.googleId) {
                user.googleId = profile.id;
                user.authStrategy = "google";
                await user.save();
            }
        }
        await server_1.client.hset(`user:${user.email}`, {
            id: user?._id,
            name: user?.name,
            email: user?.email,
            username: user?.username,
            showReadStatus: user?.showReadStatus,
            showLastSeen: user?.showLastSeen,
            avatar: avatarUrl,
        });
        done(null, user);
    }
    catch (error) {
        done(error, undefined);
    }
}));
const signUp = async (req, res) => {
    const { name, username, email, password } = req.body;
    const code = (0, nanoid_1.nanoid)();
    try {
        const existingUser = await user_1.default.findOne({ email }).select("email");
        if (existingUser) {
            throw new Error("User already exist");
        }
        await user_1.default.create({
            name: name,
            username: username,
            email: email,
            password: password,
            authStrategy: "local",
            verificationCode: code,
        });
        res.json({ success: true });
        await (0, emailService_1.sendMail)(email, code);
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
exports.signUp = signUp;
const signIn = async (req, res) => {
    const { identifier, password } = req.body;
    try {
        const user = await user_1.default.findOne({
            $or: [{ email: identifier }, { username: identifier }],
        });
        if (!user) {
            throw new Error("User not found");
        }
        else {
            if (user.authStrategy === "google") {
                throw new Error("Google users cannot login with password");
            }
            const isPasswordCorrect = await bcrypt_1.default.compare(password, user.password);
            if (isPasswordCorrect) {
                const token = (0, authservice_1.createToken)({ identifier, id: user._id.toString() });
                await server_1.client.hset(`user:${user.email}`, {
                    id: user?._id,
                    name: user?.name,
                    email: user?.email,
                    username: user?.username,
                    showReadStatus: user?.showReadStatus,
                    showLastSeen: user?.showLastSeen,
                    avatar: user?.avatar,
                });
                res.cookie("token", token, {
                    maxAge: 1000 * 3600 * 24,
                    httpOnly: true,
                    sameSite: "none",
                    path: "/",
                    secure: true,
                });
                res.json({
                    id: user?._id,
                    name: user?.name,
                    email: user?.email,
                    username: user?.username,
                    showReadStatus: user?.showReadStatus,
                    showLastSeen: user?.showLastSeen,
                    avatar: user?.avatar,
                });
            }
            else {
                throw new Error("Password is wrong");
            }
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};
exports.signIn = signIn;
const googleAuthCallback = async (req, res) => {
    const token = await (0, authservice_1.createToken)({
        identifier: req?.user?.email,
        id: req?.user?._id.toString(),
    });
    res.cookie("token", token, {
        maxAge: 1000 * 3600 * 24,
        httpOnly: true,
        // domain: process.env.DOMAIN,
        sameSite: "none",
        path: "/",
        secure: true,
    });
    res.redirect(process.env.CLIENT_URL);
};
exports.googleAuthCallback = googleAuthCallback;
const verifyUser = async (req, res) => {
    const verificationCode = req.params.code;
    try {
        const user = await user_1.default.findOneAndUpdate({ verificationCode }, { verificationStatus: true });
        res.json({ success: true, email: user?.email });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};
exports.verifyUser = verifyUser;
const getUserData = async (req, res) => {
    const token = req.cookies.token;
    if (token) {
        const payload = (0, authservice_1.getPayload)(token);
        try {
            const cachedUser = await server_1.client.hgetall(`user:${payload.identifier}`);
            const file = await (0, fileService_1.getUserAvatar)(payload.id);
            if (Object.keys(cachedUser).length > 0) {
                res.json({
                    id: cachedUser?._id,
                    name: cachedUser?.name,
                    email: cachedUser?.email,
                    username: cachedUser?.username,
                    showReadStatus: cachedUser?.showReadStatus === "true",
                    showLastSeen: cachedUser?.showLastSeen === "true",
                    avatar: cachedUser?.avatar,
                });
            }
            else {
                const user = await user_1.default.findById(payload.id).select("name email username showLastSeen showReadStatus avatar publicKey");
                await server_1.client.hset(`user:${user?.email}`, {
                    id: user?._id,
                    name: user?.name,
                    email: user?.email,
                    username: user?.username,
                    showReadStatus: user?.showReadStatus,
                    showLastSeen: user?.showLastSeen,
                    avatar: `data:${file?.file?.metadata?.contentType};base64,${file?.buffer.toString("base64")}`,
                });
                await server_1.client.expire(`user:${user?.email}`, 3600 * 24);
                res.json({
                    id: user?._id,
                    name: user?.name,
                    email: user?.email,
                    username: user?.username,
                    showReadStatus: user?.showReadStatus,
                    showLastSeen: user?.showLastSeen,
                    avatar: `data:${file?.file?.metadata?.contentType};base64,${file?.buffer.toString("base64")}`,
                });
            }
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: error?.message });
        }
    }
    else {
        res.status(401).send("unauthenticated");
    }
};
exports.getUserData = getUserData;
const logOut = async (req, res) => {
    await server_1.client.del(`user:${req?.user?.email}`);
    res
        .clearCookie("token", {
        httpOnly: true,
        sameSite: "none",
        path: "/",
        secure: true,
    })
        .send("logged out");
};
exports.logOut = logOut;
//# sourceMappingURL=authController.js.map