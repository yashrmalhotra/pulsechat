"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASS,
    },
});
const sendMail = async (email, code) => {
    try {
        await transporter.sendMail({
            from: `PulseChat ${process.env.EMAIL}`,
            to: email,
            subject: "Verification Email",
            html: `<p>Please click on the link <a href=${process.env.CLIENT_URL}/verify/${code} style="color:blue; text-decoration: underline; font-weight:bold;">Click here to verify</a>`,
        });
        console.log("email sent successfully");
    }
    catch (error) {
        console.log("email error", error);
        throw new Error(error.message);
    }
};
exports.sendMail = sendMail;
//# sourceMappingURL=emailService.js.map