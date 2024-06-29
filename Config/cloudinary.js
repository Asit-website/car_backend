

const cloudinary = require("cloudinary").v2; 

exports.cloudinaryConnect = () => {
	try {
		cloudinary.config({
			//!    ########   Configuring the Cloudinary to Upload MEDIA ########
      cloud_name: "dt2lhechn",
        api_key: "242838256114175",
        api_secret: "I6W-rU3gSh4rOAy62ApP1Z4sW3g",
		});
	} catch (error) {
		console.log(error);
	}
};