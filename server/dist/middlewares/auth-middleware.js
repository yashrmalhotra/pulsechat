"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authentication = void 0;
const authservice_1 = require("../utills/authservice");
const authentication = async (req, res, next) => {
    const token = req?.cookies?.token;
    if (!token) {
        res.status(401).json({ message: "Unauthenticated" });
    }
    else {
        const user = (0, authservice_1.getPayload)(token);
        req.user = user;
        next();
    }
};
exports.authentication = authentication;
//# sourceMappingURL=auth-middleware.js.map