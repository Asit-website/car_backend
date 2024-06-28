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
      // enum: ["Admin", "User", "Broker" ,"Seller"],
    },
    // role:String

    
  },
  { timestamps: true }
);

const User = mongoose.model("User",userSchema);

module.exports = User;
