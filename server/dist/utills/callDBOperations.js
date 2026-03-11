"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCallStatus = exports.saveCall = void 0;
const Call_1 = __importDefault(require("../models/Call"));
const saveCall = async (callDetails) => {
    try {
        await Call_1.default.create(callDetails);
    }
    catch (error) {
        console.log(error);
    }
};
exports.saveCall = saveCall;
const updateCallStatus = async (callId, status, callDuration) => {
    try {
        await Call_1.default.updateOne({ callId }, { $set: { status, callDuration } });
    }
    catch (error) {
        console.log(error);
    }
};
exports.updateCallStatus = updateCallStatus;
//# sourceMappingURL=callDBOperations.js.map