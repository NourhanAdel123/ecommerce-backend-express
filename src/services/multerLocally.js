import multer from "multer";
import { customAlphabet, nanoid } from "nanoid";
import path from "path";
import fs from "fs";

// const nanoid = customAlphabet("abcd123#", 5);

export const validExtention = {
  image: ["image/jpeg", "image/png", "image/webp"],
  file: ["application/pdf"],
  video: ["video/mp4", "video/mov", "video/avi", "video/mkv"],
};

export const multerFun = (extentionArray, CustomPath) => {
  const storage = multer.diskStorage({
    destination: function (req, file, callback) {
      const FullPath = path.resolve(`uploads/${CustomPath}`);
      if (!fs.existsSync(FullPath)) {
        fs.mkdirSync(FullPath, { recursive: true });
      }
      callback(null, FullPath);
    },
    filename: function (req, file, callback) {
      // console.log(file)
      const uniqeFileName = nanoid(5) + file.originalname;
      callback(null, uniqeFileName);
    },
  });

  const fileFilter = function (req, file, callback) {
    if (extentionArray.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new Error("Only JPG and PNG images are allowed"), false);
    }
  };

  const FileUpload = multer({ fileFilter, storage });

  return FileUpload;
};
