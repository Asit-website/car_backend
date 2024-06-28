const Seller = require("../Models/Car")

exports.createCarList = async(req ,res)=>{
    try{

        const { ListingTitle, Model,  Type , Years, Condition ,StockNumber , VINNumber , Mileage , Transmission , DriverType, EngineSize , Cylinders ,FuelType ,Doors ,Color , Seats , CityMPG , HighwayMPG , Description , RequestPriceLabel  ,RegularPrice , SalePrice } = req.body;

        const {userId} =req.params; 

        console.log('id ',userId);


         const carDetail = await Seller.create({ListingTitle, Model,  Type , Years, Condition ,StockNumber , VINNumber , Mileage , Transmission , DriverType, EngineSize , Cylinders ,FuelType ,Doors ,Color , Seats , CityMPG , HighwayMPG , Description , RequestPriceLabel  ,RegularPrice , SalePrice , userId:userId });

         return res.status(200).json({
            status:true,
            carDetail
         })


    } catch(error){
       console.log(error);
       return res.status(500).json({
        status:false , 
        message:"internal server error "
       })
    }

}


exports.getMyCars = async(req ,res)=>{
    try{

        const {userId} = req.params;

         const CarDetails = await Seller.find({userId});

         return res.status(200).json({
            status:true ,
            CarDetails
         })
     

    } catch(error){
       console.log(error);
       return res.status(500).json({
        status:false , 
        message:"internal server error "
       })
    }

}


exports.getAllCars = async(req ,res)=>{
    try{


         const CarDetails = await Seller.find({});

         return res.status(200).json({
            status:true ,
            CarDetails
         })
     

    } catch(error){
       console.log(error);
       return res.status(500).json({
        status:false , 
        message:"internal server error "
       })
    }

}