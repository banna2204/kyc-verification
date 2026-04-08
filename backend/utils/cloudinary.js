import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

export const uploadToCloudinary = (fileBuffer, folderName) => {
  if (!fileBuffer) return Promise.resolve(null);

  return new Promise((resolve) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: folderName, resource_type: "auto" },
      (error, result) => {
        if (error || !result) return resolve(null);
        resolve(result.secure_url);
      }
    );

    stream.end(fileBuffer);
  });
};