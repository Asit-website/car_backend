const express = require("express");
require('dotenv').config();
require('./db/conn');
const app = express();
const cors = require('cors');
const userRouter = require("./Router/userRouter");
const sellerRouter = require("./Router/sellerRouter");
const port = process.env.PORT;
const fileUpload = require("express-fileupload");
const {cloudinaryConnect} = require("./Config/cloudinary")


const cookieParser = require("cookie-parser");
app.use(cookieParser());


// connect to cloudinary 
cloudinaryConnect();


app.use(express.json());

app.use(cors({
  origin:"http://localhost:3000",
  credentials:true
}));

app.use(
  fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp"
  })
)

app.use("/user", userRouter);
app.use("/seller", sellerRouter);




app.get('/', (req, res) => {
  res.send('hello world');
});

app.listen(port, () => {
  console.log('Listening on ', port);
});
