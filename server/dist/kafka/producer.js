"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectProducer = exports.producer = void 0;
const kafkajs_1 = require("kafkajs");
const ca = process.env.KAFKA_CA?.replace(/\\n/g, "\n");
const kafka = new kafkajs_1.Kafka({
    clientId: "chat-app",
    brokers: [process.env.KAFKA_URL],
    ssl: {
        rejectUnauthorized: true,
        ca: [ca],
    },
    sasl: {
        username: process.env.KAFKA_USERNAME,
        password: process.env.KAFKA_PASSWORD,
        mechanism: "plain",
    },
});
const connectProducer = async () => {
    if (exports.producer)
        return exports.producer;
    try {
        const _producer = kafka.producer();
        await _producer.connect();
        exports.producer = _producer;
        console.log("producer connected succesfully");
        return exports.producer;
    }
    catch (error) {
        console.log(error);
    }
};
exports.connectProducer = connectProducer;
//# sourceMappingURL=producer.js.map