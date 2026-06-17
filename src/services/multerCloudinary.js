import multer from "multer";
import path from "path";
import fs from "fs";
import cloudinary from "./cloudinary.js";

export const multerCloudFun = (CustomPath) => {
  const storage = multer.diskStorage({
    distination: function (req, file, cb) {
      cb(null, req.file.path);
    },
  });

  const FileUpload = multer({ storage });

  return FileUpload;
};
