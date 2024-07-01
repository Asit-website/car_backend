const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    ListingTitle: {
      type: String,
    },
   
    Model : {
      type: String,
    },

    Type: {
      type: String,
    },
    confirmPassword: String,

    Years: {
      type: String,
    },
    
    Condition: {
      type: String,
    },
    StockNumber: {
      type: String,
    },
    VINNumber: {
      type: String,
    },
    Mileage: {
      type: String,
    },
    
    Transmission: {
      type: String,
    },
    DriverType: {
      type: String,
    },
    EngineSize: {
      type: String,
    },
    Cylinders: {
      type: String,
    },
    FuelType: {
      type: String,
    },
    Doors: {
      type: String,
    },
    Color: {
      type: String,
    },
    
    Seats: {
      type: String,
    },
    CityMPG: {
      type: String,
    },
    HighwayMPG: {
      type: String,
    },
    Description: {
      type: String,
    },
    
    RequestPriceLabel: {
      type: String,
    },
    RegularPrice: {
      type: String,
    },
    SalePrice: {
      type: String,
    },
    RequestPriceLabel: {
      type: String,
    },
    Photos: [{
      type: String,
    }],
    userId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User' 
    } , 
    Bid:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CarBid' 
    } ], 
    ListingFeatures:[
      {
        type: String ,
      }
    ] , 


    
  },
  { timestamps: true }
);

const CarSeller = mongoose.model("CarSeller",userSchema);

module.exports = CarSeller;
