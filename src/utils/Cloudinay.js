import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";

// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    if (!localFilePath) {
        console.warn('No file path provided');
        return null;
    }

    try {
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        });
        console.log('File is uploaded', response.url);
        return response;
    } catch (error) {
        console.error('Error uploading file:', error);
        return null;
    } finally {
        fs.unlinkSync(localFilePath); // Always remove the file
    }
}

export { uploadOnCloudinary };
