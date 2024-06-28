const express = require("express");
const {createCarList , getMyCars , getAllCars} = require("../Controller/sellerController");

const auth = require("../middleware/auth");

const router = express.Router();


router.post("/listCar/:userId" , createCarList);
router.get("/getMyCars/:userId" , getMyCars);
router.get("/getAllCars" , getAllCars);


module.exports = router;