const Seller = require("../Models/Car")
const CarBid = require("../Models/CarBid")

const { uploadToCloudinary } = require("../utils/cloudinary");


exports.createCarList = async(req ,res)=>{
    try{

        const { ListingTitle, Model,  Type , Years, Condition ,StockNumber , VINNumber , Mileage , Transmission , DriverType, EngineSize , Cylinders ,FuelType ,Doors ,Color , Seats , CityMPG , HighwayMPG , Description , RequestPriceLabel  ,RegularPrice , SalePrice , ListingFeatures } = req.body;

        console.log("ListingFeatures" , ListingFeatures);

         featuresArray = ListingFeatures.split(',');


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

        if(req.files){
           photoUrls = await uploadPhotosToCloudinary(req?.files);
         }

         const carDetail = await Seller.create({ListingTitle, Model,  Type , Years, Condition ,StockNumber , VINNumber , Mileage , Transmission , DriverType, EngineSize , Cylinders ,FuelType ,Doors ,Color , Seats , CityMPG , HighwayMPG , Description , RequestPriceLabel  ,RegularPrice , SalePrice , userId:userId , Photos: photoUrls, ListingFeatures:featuresArray });

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

         const CarDetails = await Seller.find({userId}).populate("Bid");

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


exports.getAllCars = async({id, query, page, perPage})=>{
   
   let and = [];

   if (id && id !== "" && id !== "undefined") {
       and.push({ _id: id });
   }

   if (query && query !== "" && query !== "undefined") {
       console.log(query);
       and.push({ title: { $regex: query, $options: "i" } });
   }

   if (and.length === 0) {
       and.push({});
   }
   // const count = await Project.count({ $and: and });
   let data;

   if (page && page !== "" && page !== "undefined") {
       data = await Seller.find({ $and: and }).skip((page - 1) * perPage).limit(perPage).populate({
         path: 'Bid',
         populate: { path: 'userId' } 
       }).populate('userId'); 
   }
   else
   {
       data = await Seller.find({ $and: and }).populate({
         path: 'Bid',
         populate: { path: 'userId' } 
       }).populate('userId'); 
   }
   
   return { status: true, data };
}

exports.putBitAmount = async(req ,res)=>{
   try{

      const {BidAmount ,userId} = req.body;

      const {carId} = req.params;
    
       const ans = await CarBid.create({BidAmount , userId});

        const carDetail = await Seller.findByIdAndUpdate(carId ,  { $push: { Bid: ans?._id } }, {new:true});


        return res.status(200).json({
         status:true ,
         carDetail
        })

        

   } catch(error){
      console.log(error);
      return res.status(500).json({
         status:false ,
         message:"Internal server error"
      })
   }
}