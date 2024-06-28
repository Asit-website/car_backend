const express = require("express");
const {signin,login,getUsers,verify} = require("../Controller/userController");

const auth = require("../middleware/auth");

const router = express.Router();


router.get('/verify', auth, async (req, res) => {
    const data = await verify({ auth: req.user });
    res.json(data);
});

router.get('/getUsers', async (req, res) => {
    const data = await getUsers({ ...req.query });
    res.json(data);
});

router.post("/signin" , signin);

router.post('/login' , login);

module.exports = router;