"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config.js");
const auth_route_1 = __importDefault(require("./routes/auth-route"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const ioredis_1 = __importDefault(require("ioredis"));
const user_route_1 = __importDefault(require("./routes/user-route"));
const passport_1 = __importDefault(require("passport"));
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const chat_1 = __importDefault(require("./routes/chat"));
const call_route_1 = require("./routes/call-route");
const userController_1 = require("./controllers/userController");
const producer_1 = require("./kafka/producer");
const consumer_1 = require("./kafka/consumer");
const shutdown_1 = __importDefault(require("./kafka/shutdown"));
const app = (0, express_1.default)();
exports.client = new ioredis_1.default(process.env.REDIS_URL);
exports.client.on("connect", () => console.log("redis connected"));
const server = http_1.default.createServer(app);
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(passport_1.default.initialize());
app.use(express_1.default.urlencoded({ extended: true }));
mongoose_1.default
    .connect(process.env.MONGODB_URI)
    .then(() => {
    console.log("mongodb connected");
})
    .catch((e) => {
    console.log(e);
});
app.use("/api/auth", auth_route_1.default);
app.use("/api/user", user_route_1.default);
app.use("/api/chat", chat_1.default);
app.use("/api/call", call_route_1.callRouter);
// -----------------Socket------------------
const init = async () => {
    await (0, producer_1.connectProducer)();
    await (0, consumer_1.connectConsumer)();
    const io = new socket_io_1.Server(server, {
        cors: {
            origin: process.env.CLIENT_URL,
            methods: ["GET", "POST"],
            credentials: true,
        },
    });
    io.on("connection", (socket) => {
        socket.on("send-message", async ({ text, room, senderEmail, recipientEmail, time, date, chatId, avatar, isVerified, name, username, }) => {
            io.to(room).emit("receive-message", {
                text,
                senderEmail,
                recipientEmail,
                time,
                date,
                chatId,
                isRead: false,
            });
            socket
                .to(recipientEmail)
                .emit("new-message", {
                lastMessage: text,
                name,
                username,
                lastDate: date,
                lastTime: time,
                chatId,
                avatar,
                isVerified,
                email: senderEmail,
            });
            io.to(senderEmail).emit("markAsSend", chatId, date);
            socket.to(recipientEmail).emit("isDelivered", senderEmail);
            producer_1.producer.send({ topic: "save-chats", messages: [{
                        value: JSON.stringify({ type: "save-chat", text, senderEmail, recipientEmail, date, time, status: "send", chatId })
                    }] });
        });
        socket.on("user-online", async ({ username, email }) => {
            socket.broadcast.emit("user-status", "online");
            await exports.client.set(`status:${email}`, "online");
            socket.data.email = email;
            socket.join(email);
        });
        socket.on("user-typing", ({ room, status }) => {
            socket.to(room).emit("user-status", status);
        });
        socket.on("join-room", ({ room }) => {
            socket.join(room);
        });
        socket.on("bulkMarkAsDelivered", async ({ recipientEmail }) => {
            try {
                socket.broadcast.emit("bulkMarkAsDelivered");
                await producer_1.producer.send({ topic: "save-chats", messages: [
                        { value: JSON.stringify({ type: "update-bulk-delivered-status", recipientEmail }) }
                    ] });
            }
            catch (error) { }
        });
        socket.on("markAsDelivered", async ({ senderEmail, recipientEmail }) => {
            socket.to(senderEmail).emit("markAsDelivered");
            await producer_1.producer.send({ topic: "save-chats", messages: [
                    { value: JSON.stringify({ type: "update-between-two-delivered-status", recipientEmail, senderEmail }) }
                ] });
        });
        socket.on("reading-done", async ({ senderEmail, recipientEmail, room, showReadStatus }) => {
            if (showReadStatus) {
                socket.to(room).emit("markAsRead");
            }
            await producer_1.producer.send({ topic: "save-chats", messages: [
                    { value: JSON.stringify({ type: "update-reading-status", recipientEmail, senderEmail }) }
                ] });
        });
        // ---------------------------- CALLS ---------------------------------\\
        socket.on("make-call", async ({ callRoom, callType, callerId, callerAvatar, callerName, callerUsername, callerEmail, callerVerificationStatus, offer, recipientEmail, callId, dateTime, }) => {
            socket.to(recipientEmail).emit("incoming-call", {
                callerId,
                callerName,
                callerEmail,
                callerUsername,
                callerAvatar,
                callerVerificationStatus,
                dateTime,
                callType,
                offer,
                callId,
                callRoom,
            });
            await producer_1.producer.send({ topic: "save-calls", messages: [
                    { value: JSON.stringify({ type: "save-call", callType, callerEmail, recipientEmail, dateTime, status: "ringing", callId }) }
                ] });
        });
        socket.on("accept-call", async ({ room, answer, callId }) => {
            io.to(room).emit("accept-call", answer);
            await producer_1.producer.send({ topic: "save-calls", messages: [
                    { value: JSON.stringify({ type: "update-call-status", callId, status: "accepted" }) }
                ] });
        });
        socket.on("reject-call", async (room, callId) => {
            socket.to(room).emit("reject-call", false);
            await producer_1.producer.send({ topic: "save-calls", messages: [
                    { value: JSON.stringify({ type: "update-call-status", callId, status: "rejected" }) }
                ] });
        });
        socket.on("hang-up", async ({ room, callDuration, callId }) => {
            io.to(room).emit("hang-up", false);
            await producer_1.producer.send({ topic: "save-calls", messages: [
                    { value: JSON.stringify({ type: "update-call-status", callId, status: "ended", callDuration }) }
                ] });
        });
        socket.on("ice-candidate", ({ room, candidate }) => {
            socket.to(room).emit("ice-candidate", candidate);
        });
        socket.on("disconnecting", async () => {
            const isShowLastSeenEnabled = await exports.client.hget(`user:${socket.data.email}`, "showLastSeen");
            if (isShowLastSeenEnabled === "true") {
                socket.broadcast.emit("user-status", `last seen-${new Date()}`);
                await (0, userController_1.updateUserStatus)({ email: socket.data.email });
            }
            else {
                socket.broadcast.emit("user-status", "");
            }
            await exports.client.del(`status:${socket.data.email}`);
        });
    });
    server.listen(3001, () => {
        console.log("server listen at http://localhost:3001/api");
    });
    await (0, shutdown_1.default)(producer_1.producer, consumer_1.consumer, server);
};
init();
//# sourceMappingURL=server.js.map