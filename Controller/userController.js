const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { uploadToCloudinary } = require("../utils/cloudinary");

const verify = async ({ auth }) => {
  if (!auth) {
    return { status: false };
  }
  return { status: true };
};

const getUsers = async ({ id, query, page, perPage }) => {
  data = await User.find();
  return { status: true, data };
};

// const signin = async ({ name, email, phone, password }) => {
const signin = async (req, res) => {
  try {
    // data fetch from req.body
    const { FullName, Email, Password, confirmPassword, AccountType } =
      req.body;

    // validate data
    if (!FullName || !Email || !Password || !confirmPassword || !AccountType) {
      return res.status(403).json({
        success: false,
        message: "all field are require",
      });
    }

    // 2 password match
    if (confirmPassword !== Password) {
      return res.status(400).json({
        success: false,
        message:
          "password and confirmpassword vlaue does not match , please try again",
      });
    }
    // check user already exist or not
    const existingUser = await User.findOne({ Email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "user is alreay registered",
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(Password, 10);

    const user = await User.create({
      FullName,
      Email,
      Password: hashedPassword,
      AccountType,
    });

    // return res
    return res.status(200).json({
      success: true,
      message: `user is registered successfullly`,
      user,
    });
  } catch (error) {
    console.log(`error in signup `, error);
    return res.status(500).json({
      success: false,
      message: "user cannot be register please try again",
    });
  }
};

const login = async (req, res) => {
  try {
    //  get data from req.body
    const { Email, Password } = req.body;

    //  validation data
    if (!Email || !Password) {
      return res.status(403).json({
        success: false,
        message: `all fields are required ,please try again`,
      });
    }
    // user check exist of not
    const user = await User.findOne({ Email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: `please register before login`,
      });
    }

    const payload = {
      Email: user.Email,
      id: user._id,
      AccountType: user.AccountType,
    };

    // password match and generate jwt
    if (await bcrypt.compare(Password, user.Password)) {
      //  creating token
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "3d",
      });

      // todo: toObject ki jrurt ho skti hai fat skta hai
      user.token = token;
      user.Password = undefined;

      // create cookie and send response
      res.status(200).json({
        status: true,
        message: "Successfuly login",
        user,
        token,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: `password inccorrect`,
      });
    }
  } catch (error) {
    console.log(`error in login `, error);
    return res.status().json({
      success: false,
      message: ` login failure , please try again `,
    });
  }
};

const updateUser = async ({
  userId,
  FullName,
  Email,
  phone,
  AccountType,
  location,
  description,
  Time,
}) => {
  try {
    // Check if the email is already taken by another user
    const checkUser = await User.findOne({ Email: Email });
    if (checkUser && checkUser._id != userId) {
      return { status: false, data: null, message: "Email already taken" };
    }

    // Prepare the update object
    let updateObj = {
      FullName,
      Email,
      phone,
      AccountType,
      location,
      description,
      Time,
    };

    // Upload file to Cloudinary and update img field if file is provided
    // if (file && file !== "") {
    //     const result = await uploadToCloudinary(file.path);
    //     updateObj['img'] = {
    //         url: result.url,
    //         id: result.public_id
    //     };
    // }

    // Update the user without modifying the _id field
    const ans = await User.findByIdAndUpdate(
      userId,
      { $set: updateObj },
      { new: true, omitUndefined: true }
    );

    return { status: true, data: ans, message: "User Updated Successfully" };
  } catch (error) {
    console.error("Error updating user:", error);
    return { status: false, data: null, message: "Error updating user" };
  }
};

const UpdateProfile = async (req, res) => {
  try {
    const { AccountType, FullName, Email, Phone, Location, Time, Description } = req.body;
    const { userId } = req.params;

    let ProfilePic = req.files ? req.files.ProfilePic : null; // Check if req.files exists

    let profileUrl;
    
    if (ProfilePic) {
      const ans = await uploadToCloudinary(ProfilePic.tempFilePath);
      profileUrl = ans.secure_url;
    }

    // Build update object based on whether profileUrl exists
    const updateObject = {
      AccountType,
      FullName,
      Email,
      Phone,
      Location,
      Time,
      Description,
    };

    if (profileUrl) {
      updateObject.ProfilePic = profileUrl;
    }

    // Find and update the user
    const userDetail = await User.findByIdAndUpdate(userId, updateObject, { new: true });

    return res.status(200).json({
      status: true,
      user: userDetail,
    });
  } catch (error) {
    console.log("error ", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  verify,
  getUsers,
  login,
  signin,
  updateUser,
  UpdateProfile,
};
