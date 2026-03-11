"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.callRouter = void 0;
const express_1 = __importDefault(require("express"));
const callControllers_1 = require("../controllers/callControllers");
exports.callRouter = express_1.default.Router();
exports.callRouter.get("/", callControllers_1.getRecentCalls);
//# sourceMappingURL=call-route.js.map