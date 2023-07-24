import { v2 as cloudinary } from "cloudinary"
import config from "../config";

cloudinary.config({
    cloud_name: config.cloudName,
    api_key: config.apiKey,
    api_secret: config.apiSecret
});

export async function uploadImage(imageString: string) {
    return cloudinary.uploader.upload(imageString, { folder: "books", resource_type: "image" });
}

export async function deleteImage(publicId) {
    return cloudinary.uploader.destroy(publicId);
}