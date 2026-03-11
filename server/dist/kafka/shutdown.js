"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const setUpShutDown = async (producer, consumer, server) => {
    const shutDown = async () => {
        try {
            await producer.disconnect();
            await consumer.disconnect();
            console.log("producer consumer disconnected");
            server.close(() => {
                console.log("server closed");
                process.exit(0);
            });
        }
        catch (error) {
            console.log(error);
        }
    };
    process.on("SIGINT", shutDown);
    process.on("SIGTERM", shutDown);
};
exports.default = setUpShutDown;
//# sourceMappingURL=shutdown.js.map