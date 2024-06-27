const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    FullName: {
      type: String,
      required: true,
      trim: true,
    },
   
    Email: {
      type: String,
      required: true,
      trim: true,
    },

    Password: {
      type: String,
      required: true,
    },

    AccountType: {
      type: String,
      enum: ["Admin", "User", "Broker" ,"Seller"],
    },

    
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
