const express = require("express");
const {signin,login,getUsers,verify,updateUser , UpdateProfile} = require("../Controller/userController");

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

router.put('/updateUser/:userId', auth, async (req, res) => {
    try {
        const data = await updateUser({ ...req.body,  userId: req.params.userId, auth: req.user });
        if (!data.status) {
            return res.status(400).json(data);
        }
       return res.json(data);
    } 
    
    catch (error) {
        console.log(error);
    }

});

router.post("/updateProfile/:userId" , UpdateProfile);

module.exports = router;