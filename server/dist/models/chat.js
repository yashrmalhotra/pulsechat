"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ChatSchema = new mongoose_1.Schema({
    text: { type: String, required: true },
    senderEmail: { type: String, required: true, index: true },
    recipientEmail: { type: String, required: true, index: true },
    time: { type: String, required: true },
    date: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    chatId: String,
    status: String
}, { timestamps: true });
const Chat = (0, mongoose_1.model)("Chat", ChatSchema);
exports.default = Chat;
//# sourceMappingURL=chat.js.map