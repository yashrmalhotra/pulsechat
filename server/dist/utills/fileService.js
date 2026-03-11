"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOldAvatarIfExist = exports.getUserAvatar = exports.getGfs = exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const mongodb_1 = require("mongodb");
const mongoose_1 = __importDefault(require("mongoose"));
const storage = multer_1.default.memoryStorage();
let gfs;
mongoose_1.default.connection.once("open", () => {
    gfs = new mongodb_1.GridFSBucket(mongoose_1.default.connection.db, {
        bucketName: "avatars",
    });
});
exports.upload = (0, multer_1.default)({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
});
const getGfs = () => gfs;
exports.getGfs = getGfs;
const getUserAvatar = async (identifier) => {
    const file = await mongoose_1.default.connection.db
        ?.collection("avatars.files")
        .findOne({ "metadata.identifier": identifier });
    if (file) {
        const downloadStream = gfs.openDownloadStream(file._id);
        const chunks = [];
        downloadStream.on("data", (chunk) => {
            chunks.push(chunk);
        });
        return new Promise((res, rej) => {
            downloadStream.on("data", (chunk) => {
                chunks.push(chunk);
            });
            downloadStream.on("end", () => {
                res({
                    buffer: Buffer.concat(chunks),
                    contentType: file.contentType,
                    file,
                });
            });
            downloadStream.on("error", rej);
        });
    }
};
exports.getUserAvatar = getUserAvatar;
const deleteOldAvatarIfExist = async (identifier) => {
    const file = await mongoose_1.default.connection.db
        ?.collection("avatars.files")
        .findOne({ "metadata.identifier": identifier });
    if (file) {
        await gfs.delete(file._id);
    }
};
exports.deleteOldAvatarIfExist = deleteOldAvatarIfExist;
//# sourceMappingURL=fileService.js.map