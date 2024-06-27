// Import the required modules
const express = require("express")
const router = express.Router()

// Import the Controllers

// Course Controllers Import
const {Login , Signup} = require("../Controller/auth")


router.post("/login", Login);
router.post("/signup", Signup);


module.exports = router;