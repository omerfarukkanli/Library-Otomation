import { v2 as cloudinary } from "cloudinary"
import config from "config";
cloudinary.config({
    cloud_name: config.cloudName,
    api_key: config.apiKey,
    api_secret: config.apiSecret
});

export default async function uploadImage(imageString: string) {
    return await cloudinary.uploader.upload(imageString, { folder: 'coverImage', resource_type: "auto" });
} 
