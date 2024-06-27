const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const cron = require('node-cron');
const dotenv = require('dotenv');
const userRouter = require("./Router/authRouter")

dotenv.config();
const port = process.env.PORT;


app.use("/auth", userRouter);

// Importing connectDb using CommonJS syntax
// const { connectDb } = require('./db/user_conn.js');

// Database Connection
// connectDb();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(cookieParser());

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp',
  })
);

app.get('/', (req, res) => {
  res.send('hello world');
});

app.listen(port, () => {
  console.log('Listening on ', port);
});
