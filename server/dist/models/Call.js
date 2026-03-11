"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CallSchema = new mongoose_1.Schema({
    callerEmail: { type: String, required: true, index: true },
    callType: { type: String, enum: ["voice", "video"], required: true, },
    callDuration: Number,
    recipientEmail: { type: String, required: true, index: true },
    dateTime: { type: Date, required: true },
    status: { type: String, enum: ["accepted", "rejected", "ringing", "ended"], required: true },
    callId: String
});
const Call = (0, mongoose_1.model)("Call", CallSchema);
exports.default = Call;
//# sourceMappingURL=Call.js.map