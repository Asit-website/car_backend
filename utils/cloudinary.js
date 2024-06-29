const cloudinary = require("cloudinary").v2; 
const { unlinkSync } = require("fs");



exports.uploadToCloudinary = async (localpath) => {
  try {
    if (!localpath) return null;
    const responce = await cloudinary.uploader.upload(localpath, {
      resource_type: "auto",
    });
    unlinkSync(localpath);
    // console.log("response", responce); for debugging purpose
    return responce;
  } catch (error) {
    console.log("error is encountered ", error.message);
    unlinkSync(localpath);
    return { message: "Fail" };
  }
};