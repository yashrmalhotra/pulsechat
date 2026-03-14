"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const axios_1 = __importDefault(require("axios"));
// --------------- FOR LOCAL OR DOCKER ---------------
// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 465,
//   secure: true,
//   auth: {
//     user: process.env.EMAIL,
//     pass: process.env.APP_PASS,
//   },
// })
const sendMail = async (email, code) => {
    // ---------------FOR LOCAL OR DOCKER---------------
    // try {
    //    await transporter.sendMail(
    //   {
    //     from: `PulseChat ${process.env.EMAIL}`,
    //     to: email,
    //     subject: "Verification Email",
    //     html: `<p>Please click on the link <a href=${process.env.CLIENT_URL}/verify/${code} style="color:blue; text-decoration: underline; font-weight:bold;">Click here to verify</a>`,
    //   })
    //   console.log("email sent successfully")
    // } catch (error:any) {
    //   console.log("email error",error)
    //   throw new Error(error.message)
    // }
    // --------------- FOR PRODUCTION ---------------
    try {
        const res = await axios_1.default.post("https://api.brevo.com/v3/smtp/email", {
            sender: {
                name: "PulseChat",
                email: process.env.EMAIL,
            },
            to: [{ email }],
            subject: "Verification Email",
            htmlContent: `<p>Please click on the link <a href=${process.env.CLIENT_URL}/verify/${code} style="color:blue; text-decoration: underline; font-weight:bold;">Click here to verify</a>`,
        }, {
            headers: {
                "api-key": process.env.BREVO_API_KEY,
                "Content-Type": "application/json"
            }
        });
        console.log("email res", res.data);
    }
    catch (error) {
        console.log(error?.response?.data);
    }
};
exports.sendMail = sendMail;
//# sourceMappingURL=emailService.js.map