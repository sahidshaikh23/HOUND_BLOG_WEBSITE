import fs from 'fs'
import {v2 as cloudinary} from 'cloudinary';


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadCloudinary = async(localFilePath)=>{
    try {
        if(!localFilePath) return null

       const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        })
        console.log("Uploaded on cloudinary"+response)
        return response
    } catch (error) {
        console.log(error)
        fs.unlinkSync(localFilePath)
        //remove the locally saved temporary file as upload operation failed
        return null
    } finally{
        fs.unlinkSync(localFilePath)
    }
}

export {uploadCloudinary};