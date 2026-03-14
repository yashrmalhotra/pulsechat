"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateChatReadStatus = exports.updateChatBetweenTwoDeliveredStatus = exports.updateChatDeliveredStatus = exports.saveChat = void 0;
const chat_1 = __importDefault(require("../models/chat"));
const saveChat = async (chat) => {
    try {
        await chat_1.default.create(chat);
    }
    catch (error) {
        console.log("error", error);
        throw new Error(error.message);
    }
};
exports.saveChat = saveChat;
const updateChatDeliveredStatus = async (recipientEmail) => {
    try {
        await chat_1.default.updateMany({ recipientEmail }, { $set: { status: "delivered" } });
    }
    catch (error) {
        console.log("error", error);
        throw new Error(error.message);
    }
};
exports.updateChatDeliveredStatus = updateChatDeliveredStatus;
const updateChatBetweenTwoDeliveredStatus = async ({ recipientEmail, senderEmail }) => {
    try {
        await chat_1.default.updateMany({ recipientEmail, senderEmail }, { $set: { status: "delivered" } });
    }
    catch (error) {
        console.log("error", error);
        throw new Error(error.message);
    }
};
exports.updateChatBetweenTwoDeliveredStatus = updateChatBetweenTwoDeliveredStatus;
const updateChatReadStatus = async ({ recipientEmail, senderEmail }) => {
    try {
        await chat_1.default.updateMany({ recipientEmail, senderEmail }, { $set: { isRead: true } });
    }
    catch (error) {
        console.log("error", error);
        throw new Error(error.message);
    }
};
exports.updateChatReadStatus = updateChatReadStatus;
//# sourceMappingURL=chatDBOperations.js.map