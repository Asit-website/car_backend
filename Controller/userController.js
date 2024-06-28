const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");

const verify = async ({ auth }) => {
    if (!auth) {
        return { status: false };
    }
    return { status: true };
};

const getUsers = async ({ id, query, page, perPage }) => {
    data = await User.find();
    return { status: true, data };
};

// const signin = async ({ name, email, phone, password }) => {
const signin = async ({ FullName, Email,  Password, confirmPassword, AccountType }) => {
    const checkUser = await User.findOne({ Email });
    // const checkUser1 = await User.findOne({ phone });

    // if (checkUser || checkUser1) {
    if (checkUser) {
        return { status: false, message: 'User already exists' };
    }

    if (Password !== confirmPassword) {
        //    window.alert("password and confirmPassword must be same")
        return { status: false, message: 'password and confirm password must be same' };
    }

    const pass = await bcrypt.hash(Password, 10);
    const confirmPass = await bcrypt.hash(confirmPassword, 10);


    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: "webmaster.kushel@gmail.com",
            pass: "paurymswxlpytekp",
        },
        from: "info@kusheldigi.com",
        tls: {
            rejectUnauthorized: false,
        },
    });

    let info1 = await transporter.sendMail({
        from: '"Kushel Digi Solutions" <info@kusheldigi.com>',
        to: Email,
        subject: "Your Registeration is Complete",
        text: `
            <div>
                <div>login with the link: </div>
            </div>
        `,
        html: `
        <div>
        <div>login with the link: </div>
        </div>`
    });
    console.log(info1);


    const newUser = new User({
        FullName,
        Email,
        // phone,
        Password: pass,
        AccountType,
        confirmPassword: confirmPass,
        role: 'USER'
    });
    const saveUser = await newUser.save();
    return { status: true, data: saveUser, message: 'User Registration Successfull' };
};

const login = async ({ Email, Password }) => {
    let emailCheck = await User.findOne({ Email });
    console.log("email" ,emailCheck);
    if (!emailCheck) {
        return { status: false, message: "Invalid Credentials" };
    }
    const passwordVerify = await bcrypt.compare(Password, emailCheck.Password);
    if (!passwordVerify) {
        return { status: false, message: "Invalid Credentials" };
    }
    let token = jwt.sign({ _id: emailCheck._id }, process.env.SK);
    return { status: true, message: "Login success", token, user: emailCheck };
};

module.exports = {
    verify,
    getUsers,
    login,
    signin
}
