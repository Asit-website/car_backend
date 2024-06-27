
const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



exports.Login = async(req ,res)=>{
    try{

        const {Email , Password} = req.body;

        if(!Email || !Password){
            return res.status(403).json({
                status:false ,
                message:"Please send the erquire detail"
            })
            
        }

        const userDetail = await User.find({Email});

        if(!userDetail){
            return res.status(404).json({
                status:false ,
                message:'User not found'
            })
        }

        const payload = {
            email: userDetail.Email,
            id: userDetail._id,
          };
        
    // password match and generate jwt
    if (await bcrypt.compare(Password, userDetail.Password)) {
        //  creating token
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: "3d",
        });
  
        // todo: toObject ki jrurt ho skti hai fat skta hai
        userDetail.token = token;
  
        const options = {
          expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          httpOnly: true,
        };
  
        // create cookie and send response
   return res.status(200).json({
    status:true ,
    userDetail
   })

      } else {
        return res.status(401).json({
          success: false,
          message: `password inccorrect`,
        });
      }

    } catch(error){
        return res.status(500).json({
            status:false ,
            messag:"internal server error "
        })
    }
}

exports.Signup = async (req, res) => {
    try {
      // data fetch from req.body
      const { FullName , Email , Password} = req.body;
  
      // validate data
      if(!FullName || !Email || !Password){
        return res.status(403).json({
            status:false , 
            message:"Please send the require data"
        })
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