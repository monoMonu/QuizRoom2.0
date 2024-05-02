import { v2 as cloudinary } from 'cloudinary';
import config from '../config.js';
import fs from 'fs';

cloudinary.config({ 
    cloud_name: config.cloud_name, 
    api_key: config.api_key, 
    api_secret: config.api_secret,
});


const uploadImgOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        const res = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });
        fs.unlinkSync(localFilePath);
        return Promise.resolve(res);
    } catch (error) {
        fs.unlinkSync(localFilePath);
        return null;
    }
}

const deleteFromCloudinary = async (publicId) => {
    try {
        await cloudinary.uploader.destroy(publicId);
    } catch (error) {
        console.log("Couldn't delete or file doesn't exist");
    }
}

export {
    uploadImgOnCloudinary,
    deleteFromCloudinary
};