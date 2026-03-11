import multer from "multer"
import { GridFSBucket } from "mongodb"
import mongoose from "mongoose"
import fs from "node:fs"
const storage = multer.memoryStorage()
let gfs: GridFSBucket
mongoose.connection.once("open", () => {
  gfs = new GridFSBucket(mongoose.connection.db!, {
    bucketName: "avatars",
  })
})
export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
})

export const getGfs = () => gfs

export const getUserAvatar = async (identifier: string) => {
  const file = await mongoose.connection.db
    ?.collection("avatars.files")
    .findOne({ "metadata.identifier": identifier })!
  if (file) {
    const downloadStream = gfs.openDownloadStream(file._id)
    const chunks: Buffer[] = []
    downloadStream.on("data", (chunk) => {
      chunks.push(chunk)
    })
    return new Promise<{ buffer: Buffer; contentType: string; file: any }>(
      (res, rej) => {
        downloadStream.on("data", (chunk) => {
          chunks.push(chunk)
        })
        downloadStream.on("end", () => {
          res({
            buffer: Buffer.concat(chunks),
            contentType: file.contentType,
            file,
          })
        })
        downloadStream.on("error", rej)
      },
    )
  }
}
export const deleteOldAvatarIfExist = async (identifier: string) => {
  const file = await mongoose.connection.db
    ?.collection("avatars.files")
    .findOne({ "metadata.identifier": identifier })
    if(file){
      await gfs.delete(file._id)
    }
}
