"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserSchema = new mongoose_1.Schema({
    name: { type: String, required: true, index: true },
    email: { type: String, required: true, unique: true, index: true, },
    username: { type: String, required: true, index: true, unique: true },
    verificationStatus: { type: Boolean, default: false },
    verificationCode: String,
    password: { type: String },
    showLastSeen: { type: Boolean, default: true },
    lastSeen: Date,
    showReadStatus: { type: Boolean, default: true },
    authStrategy: String,
    googleId: String,
    avatar: String,
});
UserSchema.pre("save", async function () {
    if (this.isModified("password")) {
        const salt = await bcrypt_1.default.genSalt(10);
        this.password = await bcrypt_1.default.hash(this.password, salt);
    }
});
const User = (0, mongoose_1.model)("User", UserSchema);
exports.default = User;
//# sourceMappingURL=user.js.map