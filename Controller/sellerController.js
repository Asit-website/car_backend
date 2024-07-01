const Seller = require("../Models/Car")
const { uploadToCloudinary } = require("../utils/cloudinary");


exports.createCarList = async(req ,res)=>{
    try{

        const { ListingTitle, Model,  Type , Years, Condition ,StockNumber , VINNumber , Mileage , Transmission , DriverType, EngineSize , Cylinders ,FuelType ,Doors ,Color , Seats , CityMPG , HighwayMPG , Description , RequestPriceLabel  ,RegularPrice , SalePrice , ListingFeatures } = req.body;

        console.log("ListingFeatures" , ListingFeatures);

        const {userId} =req.params; 


        const photoKeys = ['photo1', 'photo2', 'photo3', 'photo4', 'photo5'];
        let photoUrls = [];


        const uploadPhotosToCloudinary = async (photos) => {
         for (const key of photoKeys) {
           const photo = photos[key]? photos[key]:null;
           if (photo) {
             const ans = await uploadToCloudinary(photo.tempFilePath);
             photoUrls.push(ans.secure_url);
           }
         }
         return photoUrls;
       };

       photoUrls = await uploadPhotosToCloudinary(req.files);

         const carDetail = await Seller.create({ListingTitle, Model,  Type , Years, Condition ,StockNumber , VINNumber , Mileage , Transmission , DriverType, EngineSize , Cylinders ,FuelType ,Doors ,Color , Seats , CityMPG , HighwayMPG , Description , RequestPriceLabel  ,RegularPrice , SalePrice , userId:userId , Photos: photoUrls, ListingFeatures });

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