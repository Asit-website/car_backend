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

router.post('/signin', async (req, res) => {
    const data = await signin({ ...req.body });
    if (!data.status) {
        return res.status(400).json(data);
    }
    res.json(data);
});

router.post('/login', async (req, res) => {
    console.log("in");
    const data = await login({ ...req.body });
    if (!data.status) {
        return res.status(400).json(data);
    }
    res.json(data);
});

module.exports = router;