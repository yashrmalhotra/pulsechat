"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserStatus = exports.searchUser = exports.storeUserAvatar = exports.userSettings = void 0;
const user_1 = __importDefault(require("../models/user"));
const fileService_1 = require("../utills/fileService");
const server_1 = require("../server");
const userSettings = async (req, res) => {
    const { email, field, value } = req.body;
    try {
        if (field === "username") {
            const user = await user_1.default.findOne({ username: value }).select("username");
            if (user) {
                throw new Error("Username already exist");
            }
        }
        await user_1.default.updateOne({ email }, { [field]: value });
        console.log("req?.user?.email", req?.user?.identifier);
        await server_1.client.hset(`user:${req?.user?.identifier}`, field, value);
        res.json({ success: true });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.userSettings = userSettings;
const storeUserAvatar = async (req, res) => {
    if (!req.file) {
        res.status(400).json({ message: "No image uploaded" });
    }
    else {
        await (0, fileService_1.deleteOldAvatarIfExist)(req?.user?.id);
        const gfs = (0, fileService_1.getGfs)();
        const fileName = Date.now() + "-" + req?.user?.id + req.file.originalname;
        const uploadStream = gfs.openUploadStream(fileName, {
            metadata: {
                contentType: req.file.mimetype,
                identifier: req.user?.id, // optional
                fileName,
            },
        });
        uploadStream.end(req.file.buffer);
        uploadStream.on("error", (e) => {
            console.log("err", e);
        });
        uploadStream.on("finish", async () => {
            try {
                await server_1.client.del(`user:${req?.user?.identifier}`, (err, response) => {
                    if (err) {
                        console.error(err);
                    }
                    if (response === 1) {
                        console.log("Deleted Successfully!");
                    }
                    else {
                        console.log("Key not found or cannot be deleted.");
                    }
                });
                await user_1.default.updateOne({ _id: req?.user?.id }, { $set: { avatar: fileName } });
                res.json({ success: true });
            }
            catch (error) {
                console.log(error);
                res.status(400).json({ success: false });
            }
        });
    }
};
exports.storeUserAvatar = storeUserAvatar;
const searchUser = async (req, res) => {
    const { query } = req.body;
    try {
        let users = await user_1.default.find({
            $or: [
                { username: { $regex: query, $options: "i" } },
                { email: { $regex: query, $options: "i" } },
                { name: { $regex: query, $options: "i" } },
            ],
        }).select("name username avatar verificationStatus");
        if (users.length > 0) {
            users = await Promise.all(users.map(async (user) => {
                const file = await (0, fileService_1.getUserAvatar)(user._id.toString());
                return {
                    ...user.toObject(),
                    avatar: file
                        ? `data:${file.file.metadata.contentType};base64,${file.buffer.toString("base64")}`
                        : null,
                };
            }));
        }
        res.json({ users });
    }
    catch (error) {
        res.status(400).json({ message: "Something went wrong" });
    }
};
exports.searchUser = searchUser;
const updateUserStatus = async ({ email }) => {
    try {
        await user_1.default.updateOne({ email }, { $set: { lastSeen: new Date() } });
    }
    catch (error) {
        console.log(error);
    }
};
exports.updateUserStatus = updateUserStatus;
//# sourceMappingURL=userController.js.map