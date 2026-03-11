"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chatController_1 = require("../controllers/chatController");
const auth_middleware_1 = require("../middlewares/auth-middleware");
const chatRouter = express_1.default.Router();
chatRouter.use(auth_middleware_1.authentication);
chatRouter.get("/", chatController_1.getChats);
chatRouter.get("/recipient-chat", chatController_1.getRecipientChat);
exports.default = chatRouter;
//# sourceMappingURL=chat.js.map