"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectProducer = exports.producer = void 0;
const kafkajs_1 = require("kafkajs");
const kafka = new kafkajs_1.Kafka({
    clientId: "chat-app",
    brokers: [process.env.KAFKA_URL]
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