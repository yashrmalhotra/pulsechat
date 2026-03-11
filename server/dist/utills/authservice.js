"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPayload = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretKey = "tk";
const createToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, secretKey, { expiresIn: "24h" });
};
exports.createToken = createToken;
const getPayload = (token) => {
    return jsonwebtoken_1.default.verify(token, secretKey);
};
exports.getPayload = getPayload;
//# sourceMappingURL=authservice.js.map