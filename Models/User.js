const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    FullName: {
      type: String,
    },
   
    Email: {
      type: String,
    },

    Password: {
      type: String,
    },
    confirmPassword: String,

    AccountType: {
      type: String,
    },
  
    Time:{
      type:String
    },
    description:{
      type:String
    },
    ProfilePic:{
      type:String, 
    },
    Phone:{
      type:String,
    },
    Location:{
      type:String ,
    }, 
    Description:{
      type :String,
    } , 
    car:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Car",
  }],
    role:String
  },
  { timestamps: true }
);

const User = mongoose.model("User",userSchema);

module.exports = User;
