import multer from "multer";
import cloudinary from "./cloudinary.js";

export const multerCloudFun = () => {
  const storage = multer.diskStorage({});

  const FileUpload = multer({ storage });

  return FileUpload;
};
