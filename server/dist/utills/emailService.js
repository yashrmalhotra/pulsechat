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
    const cooldown = false;
    if (cooldown)
        return;
    try {
        await transporter.sendMail({
            from: `Chat-app ${process.env.EMAIL}`,
            to: email,
            subject: "Verification Email",
            html: `<p>Please click on the link <a href=$${process.env.CLIENT_URL}/verify/${code}>Click to verify</a>`,
        }, async (error, emailsuccess) => {
            if (error) {
                console.log(error);
            }
            else {
                console.log("email sent succesfully");
            }
        });
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.sendMail = sendMail;
//# sourceMappingURL=emailService.js.map