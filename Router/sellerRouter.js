const express = require("express");
const {createCarList , getMyCars , getAllCars , putBitAmount, getCars} = require("../Controller/sellerController");

const auth = require("../middleware/auth");

const router = express.Router();


router.post("/listCar/:userId" , createCarList);
router.get("/getMyCars/:userId" , auth, getMyCars);
router.get("/getCar/:id",auth,getCars);

router.post("/putBitAmount/:carId" , putBitAmount);
// router.get("/getAllCars" , getAllCars);

router.get('/getAllCars', async (req, res) => {
    const data = await getAllCars({ ...req.query });
    res.json(data);
});


module.exports = router;