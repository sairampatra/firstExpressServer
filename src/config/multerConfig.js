import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { api_key, api_secret, cloud_name } from "./serverConfig.js";
import multer from "multer";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();
cloudinary.config({
  cloud_name: cloud_name,
  api_key: api_key,
  api_secret: api_secret,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads", // The folder in your Cloudinary account where images will be stored
    allowed_formats: ["jpg", "png"], // Allowed file types
  },
});

const fileFilter = (req, file, cb) => {
  if (!file) {
    // If no file is provided, return an error
    return cb(new Error("File not found"), false);
  }

  // Check if the file's MIME type is supported
  if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
    // If the file type is not supported, reject the file
    return cb(new Error("File type not supported"), false);
  }

  // If the file passes validation, accept it
  cb(null, true);
};

const upload = multer({ storage,fileFilter });

export { upload };

export const deleteCloudeFile = async (fileUrl) => {
  try {
    const publicId = fileUrl
      .split("/")
      .slice(-2) // Get the last 3 parts of the URL (e.g., ['uploads', 'filename.jpg'])
      .join("/")
      .split(".")[0]; // Remove the file extension
    // console.log(publicId)
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error("Error deleting file:", error);
    throw error;
  }
};

export const deleteAll = async () => {
  try {
    const resources = await cloudinary.api.resources({
      resource_type: "image",
      type: "upload",
      max_results: 500,
    });
// console.log(resources)
    const publicIds = resources.resources.map(resource => resource.public_id);
    if (publicIds.length === 0) {
        console.log('No images found in your Cloudinary account.');
        return;
      }
      console.log(`Found ${publicIds.length} images. Deleting them now...`);
     await cloudinary.api.delete_resources(publicIds);

  } catch (error) {
    console.error('Error deleting images:', error);

  }
};
