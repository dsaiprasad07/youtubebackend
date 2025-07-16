import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'


cloudinary.config({
    cloud_name: process.env.CLOUDDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDDINARY_API_KEY,
    api_secret: process.env.CLOUDDINARY_API_SECRET
});

const cloudinaryUpload = async (localfilePath) => {
    try {
        if (!localfilePath) return null
        //upload file on the cloudinary  
        const respons = await cloudinary.uploader.upload(localfilePath, {
            resource_type: 'auto'
        })
        console.log("file uploaded cloudinary", respons.url)
        return respons

    } catch (error) {
        // remove the locally saved tempory file 
        fs.unlink(localfilePath)
    }

}

export default cloudinaryUpload