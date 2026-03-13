"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectConsumer = exports.consumer = void 0;
const kafkajs_1 = require("kafkajs");
const chatDBOperations_1 = require("../utills/chatDBOperations");
const callDBOperations_1 = require("../utills/callDBOperations");
const ca = process.env.KAFKA_CA?.replace(/\\n/g, "\n");
const kafka = new kafkajs_1.Kafka({
    clientId: "chat-consumer",
    brokers: [process.env.KAFKA_URL],
    ssl: {
        rejectUnauthorized: true,
        ca: [ca]
    },
    sasl: {
        username: process.env.KAFKA_USERNAME,
        password: process.env.KAFKA_PASSWORD,
        mechanism: "plain"
    }
});
exports.consumer = kafka.consumer({ groupId: "chat-group-v3" });
const connectConsumer = async () => {
    try {
        await exports.consumer.connect();
        await exports.consumer.subscribe({ topic: "save-chats", fromBeginning: true });
        await exports.consumer.subscribe({ topic: "save-calls", fromBeginning: true });
        console.log("consumer connected successfully");
        await exports.consumer.run({
            eachMessage: async ({ topic, message }) => {
                if (!message.value)
                    return;
                const event = JSON.parse(message.value.toString());
                const { type, text, senderEmail, recipientEmail, date, time, status, chatId, } = event;
                if (topic === "save-chats") {
                    switch (type) {
                        case "save-chat":
                            try {
                                await (0, chatDBOperations_1.saveChat)({
                                    text,
                                    senderEmail,
                                    recipientEmail,
                                    date,
                                    time,
                                    status,
                                    chatId,
                                });
                            }
                            catch (error) {
                                exports.consumer.pause([{ topic }]);
                                setTimeout(() => {
                                    exports.consumer.resume([{ topic }]);
                                }, 5000);
                                console.log(error);
                            }
                            break;
                        case "update-bulk-delivered-status":
                            try {
                                await (0, chatDBOperations_1.updateChatDeliveredStatus)(recipientEmail);
                            }
                            catch (error) {
                                exports.consumer.pause([{ topic }]);
                                setTimeout(() => {
                                    exports.consumer.resume([{ topic }]);
                                }, 5000);
                                console.log(error);
                            }
                            break;
                        case "update-between-two-delivered-status":
                            try {
                                await (0, chatDBOperations_1.updateChatBetweenTwoDeliveredStatus)({
                                    senderEmail,
                                    recipientEmail,
                                });
                            }
                            catch (error) {
                                exports.consumer.pause([{ topic }]);
                                setTimeout(() => {
                                    exports.consumer.resume([{ topic }]);
                                }, 5000);
                                console.log(error);
                            }
                            break;
                        case "update-reading-status":
                            try {
                                await (0, chatDBOperations_1.updateChatReadStatus)({ recipientEmail, senderEmail });
                            }
                            catch (error) {
                                exports.consumer.pause([{ topic }]);
                                setTimeout(() => {
                                    exports.consumer.resume([{ topic }]);
                                }, 5000);
                                console.log(error);
                            }
                            break;
                    }
                }
                if (topic === "save-calls") {
                    const event = JSON.parse(message.value.toString());
                    const { type, callType, callerEmail, recipientEmail, dateTime, status, callId, callDuration, } = event;
                    switch (type) {
                        case "save-call":
                            try {
                                await (0, callDBOperations_1.saveCall)({
                                    callType,
                                    callerEmail,
                                    recipientEmail,
                                    dateTime,
                                    callId,
                                    status,
                                });
                            }
                            catch (error) {
                                exports.consumer.pause([{ topic }]);
                                setTimeout(() => {
                                    exports.consumer.resume([{ topic }]);
                                }, 5000);
                                console.log("error", error);
                            }
                            break;
                        case "update-call-status":
                            try {
                                await (0, callDBOperations_1.updateCallStatus)(callId, status, callDuration);
                            }
                            catch (error) {
                                exports.consumer.pause([{ topic }]);
                                setTimeout(() => {
                                    exports.consumer.resume([{ topic }]);
                                }, 5000);
                                console.log(error);
                            }
                    }
                }
            },
        });
    }
    catch (error) {
        console.log(error);
    }
};
exports.connectConsumer = connectConsumer;
//# sourceMappingURL=consumer.js.map