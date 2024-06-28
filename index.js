const express = require("express");
require('dotenv').config();
require('./db/conn');
const app = express();
const cors = require('cors');
const userRouter = require("./Router/userRouter");
const port = process.env.PORT;


app.use("/user", userRouter);

// Importing connectDb using CommonJS syntax
// const { connectDb } = require('./db/user_conn.js');

// Database Connection
// connectDb();

app.use(cors(
  {
      // origin: 'https://buildlinknetwork.com' ,
      origin: 'http://localhost:3000/' ,
      credentials:true ,
      methods: ["GET", "POST", "PUT", "DELETE"],
  }
));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.get('/', (req, res) => {
  res.send('hello world');
});

app.listen(port, () => {
  console.log('Listening on ', port);
});
