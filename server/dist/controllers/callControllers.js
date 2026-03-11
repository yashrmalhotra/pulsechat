"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecentCalls = void 0;
const Call_1 = __importDefault(require("../models/Call"));
const fileService_1 = require("../utills/fileService");
const getRecentCalls = async (req, res) => {
    try {
        const { email } = req.query;
        console.log("email", email);
        const recentCallers = await Call_1.default.aggregate([
            { $match: { $or: [{ recipientEmail: email }, { callerEmail: email }] } },
            { $sort: { dateTime: -1 } },
            {
                $addFields: {
                    otherCaller: {
                        $cond: [
                            { $eq: ["$callerEmail", email] },
                            "$recipientEmail",
                            "$callerEmail",
                        ],
                    },
                    direction: {
                        $cond: [
                            { $eq: ["$callerEmail", email] },
                            "outgoing",
                            {
                                $cond: [
                                    {
                                        $and: [
                                            { $eq: ["$callDuration", 0] },
                                            { $eq: ["$status", "ended"] },
                                        ],
                                    },
                                    "missed",
                                    "incoming",
                                ],
                            },
                        ],
                    },
                },
            },
            {
                $group: {
                    _id: "$otherCaller",
                    calls: {
                        $push: {
                            direction: "$direction",
                            dateTime: "$dateTime",
                            callType: "$callType",
                        },
                    },
                },
            },
            { $sort: { lastCallDate: -1 } },
            {
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "email",
                    as: "user",
                },
            },
            { $unwind: "$user" },
            {
                $project: {
                    _id: "$user._id",
                    email: "$user.email",
                    avatar: "$user.avatar",
                    name: "$user.name",
                    username: "$user.username",
                    verificationStatus: "$user.verificationStatus",
                    calls: 1,
                },
            },
        ]);
        recentCallers.forEach((caller) => {
            if (!caller.calls || caller.calls.length === 0) {
                caller.missedCount = 0;
                return;
            }
            const latestCall = caller.calls[0];
            caller.latestCall = latestCall;
            if (latestCall.direction === "missed") {
                let count = 0;
                for (const call of caller.calls) {
                    if (call.direction === "missed") {
                        count++;
                    }
                    else {
                        break;
                    }
                }
                caller.missedCount = count;
            }
            else {
                caller.missedCount = 0;
            }
            delete caller.calls;
        });
        await Promise.all(recentCallers.map(async (caller) => {
            if (caller.avatar) {
                const file = await (0, fileService_1.getUserAvatar)(caller._id.toString());
                caller.avatar = file
                    ? `data:${file.file.metadata.contentType};base64,${file.buffer.toString("base64")}`
                    : null;
            }
        }));
        res.json({ recentCallers });
    }
    catch (error) {
        res.status(500).send("error");
    }
};
exports.getRecentCalls = getRecentCalls;
//# sourceMappingURL=callControllers.js.map