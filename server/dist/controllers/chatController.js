"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecipientChat = exports.getChats = void 0;
const chat_1 = __importDefault(require("../models/chat"));
const user_1 = __importDefault(require("../models/user"));
const fileService_1 = require("../utills/fileService");
const server_1 = require("../server");
const getChats = async (req, res) => {
    const { email } = req.query;
    try {
        const chats = await chat_1.default.aggregate([
            { $match: { $or: [{ recipientEmail: email }, { senderEmail: email }] } },
            { $sort: { date: -1 } },
            {
                $addFields: {
                    otherEmail: {
                        $cond: [
                            { $eq: ["$senderEmail", email] },
                            "$recipientEmail",
                            "$senderEmail",
                        ],
                    },
                },
            },
            {
                $group: {
                    _id: "$otherEmail",
                    lastMessage: { $first: "$text" },
                    lastTime: { $first: "$time" },
                    lastDate: { $first: "$date" },
                    lastChatId: { $first: "$chatId" },
                    lastChatStatus: { $first: "$status" },
                    unreadCount: {
                        $sum: {
                            $cond: [
                                {
                                    $and: [
                                        { $eq: ["$recipientEmail", email] },
                                        { $eq: ["$isRead", false] }
                                    ]
                                }, 1, 0
                            ]
                        }
                    }
                },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "email",
                    as: "user",
                }
            },
            { $unwind: "$user" },
            {
                $project: {
                    _id: "$user._id",
                    email: "$user.email",
                    name: "$user.name",
                    username: "$user.username",
                    avatar: "$user.avatar",
                    isVerified: "$user.verificationStatus",
                    lastMessage: 1,
                    lastTime: 1,
                    lastDate: 1,
                    lastChatId: 1,
                    lastChatStatus: 1,
                    unreadCount: 1,
                },
            },
            { $sort: { lastDate: -1 } }
        ]);
        await Promise.all(chats.map(async (chat) => {
            if (chat.avatar) {
                const file = await (0, fileService_1.getUserAvatar)(chat._id.toString());
                chat.avatar = file
                    ? `data:${file.file.metadata.contentType};base64,${file.buffer.toString("base64")}`
                    : null;
            }
        }));
        const totalUnreadCount = chats.reduce((acc, chat) => acc + (chat.unreadCount || 0), 0);
        res.json({ chats: chats, totalUnreadCount });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getChats = getChats;
const getRecipientChat = async (req, res) => {
    try {
        const { recipient, user } = req.query;
        const recipientDetails = await user_1.default.findOne({ username: recipient }).select("-password -verficationCode -authStrategy").lean();
        const chats = await chat_1.default.find({ $or: [
                { senderEmail: user, recipientEmail: recipientDetails?.email },
                { senderEmail: recipientDetails?.email, recipientEmail: user },
            ] }).sort({ createdAt: 1 }).lean();
        console.log("recipientDetails?.showReadStatus", recipientDetails?.showReadStatus);
        if (!recipientDetails?.showReadStatus) {
            chats.forEach((chat) => {
                delete chat.isRead;
            });
        }
        const file = await (0, fileService_1.getUserAvatar)(recipientDetails?._id.toString());
        if (file && recipientDetails?.avatar) {
            recipientDetails.avatar = `data:${file.file.metadata.contentType};base64,${file.buffer.toString("base64")}`;
        }
        let status = await server_1.client.get(`status:${recipientDetails?.email}`);
        if (!status) {
            if (recipientDetails?.showLastSeen && recipientDetails?.lastSeen) {
                status = `last seen-${recipientDetails?.lastSeen}`;
            }
        }
        res.json({ recipient: recipientDetails, chats, status });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ error: "Something went wrong" });
    }
};
exports.getRecipientChat = getRecipientChat;
//# sourceMappingURL=chatController.js.map