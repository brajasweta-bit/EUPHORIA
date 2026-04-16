import { v2 as cloudinary } from "cloudinary";
import fs from 'fs'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});


/////////////////////////
// Uploads an image file
/////////////////////////
const uploadOnCloudinary = async (localPath) => {

    // Use the uploaded file's name as the asset's public ID and 
    // allow overwriting the asset with new versions
    const options = {
      use_filename: true,
      unique_filename: false,
      resource_type :"auto"
    };

    try {
      // Upload the image
      const result = await cloudinary.uploader.upload(localPath, options);
      fs.unlinkSync(localPath,()=>console.log("Items deleted from local storage"))
      return result.secure_url;
    } catch (error) {
      console.error(error);
    }
};

export default uploadOnCloudinary;
