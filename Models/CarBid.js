const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    BidAmount: {
      type: String,
    },
    userId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User' 
    } , 
    
  },
  { timestamps: true }
);

const CarBid = mongoose.model("CarBid",userSchema);

module.exports = CarBid;
