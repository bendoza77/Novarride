const jwt = require("jsonwebtoken");
const ms = require("ms");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const User = require("../models/user.model");
const sendEmail = require("../utils/email");

const signToken = (id, role) => {

    return jwt.sign({id, role}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES});

}

const createSendToken = (user, statusCode, res) => {

    const token = signToken(user._id, user.role);

    const cookieOptions = {
        maxAge: ms(process.env.COOKIE_EXPIRES),  
        httpOnly: true,                           
        secure: process.env.NODE_ENV !== "dev", 
        sameSite: "lax"                           
    };
    user.password = undefined;

    res.cookie("ls", token, cookieOptions);

    return res.status(statusCode).json({
        status: "succasse",
        data: {user}
    })


}

const sisgnUp = catchAsync(async (req, res, next) => {

    const { fullName, email, password, phone} = req.body;

    if (!fullName || !email || !password || !phone) {
        return next(new AppError("All field is required", 401));
    }

    const newUser = await User.create({
        fullName,
        email,
        password,
        phone,
    })

    const code =  newUser.createVerificationCode();
    await newUser.save({validateBeforeSave: false});
    const url = `${req.protocol}://${req.get("host")}/api/users/verify/${code}`;
    const designe = ` <!DOCTYPE html>
                        <html lang="en">
                        <head>
                            <meta charset="UTF-8">
                            <title>Novarride Email</title>
                        </head>
                        <body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color:#f4f4f4;">
                            <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f4; padding:20px 0;">
                            <tr>
                                <td align="center">
                                <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 0 10px rgba(0,0,0,0.1);">
                                    <!-- Header -->
                                    <tr>
                                    <td align="center" style="background-color:#1a73e8; color:#ffffff; padding:30px 20px;">
                                        <h1 style="margin:0; font-size:28px;">Welcome to Novarride!</h1>
                                    </td>
                                    </tr>

                                    <!-- Content -->
                                    <tr>
                                    <td style="padding:20px; text-align:center; color:#333333;">
                                        <p style="font-size:16px; line-height:1.5; margin-bottom:20px;">Hello,</p>
                                        <p style="font-size:16px; line-height:1.5; margin-bottom:20px;">Thank you for joining Novarride. We are excited to have you on board! Click the button below to get started with your ride experience.</p>
                                        <a href=${url} style="display:inline-block; background-color:#1a73e8; color:#ffffff; padding:12px 25px; font-size:16px; border-radius:5px; font-weight:bold; text-decoration:none;">Get Started</a>
                                    </td>
                                    </tr>

                                    <!-- Footer -->
                                    <tr>
                                    <td align="center" style="background-color:#f0f0f0; color:#555555; font-size:12px; padding:15px 20px;">
                                        &copy; 2026 Novarride. All rights reserved.<br>
                                        123 Novarride Street, City, Country
                                    </td>
                                    </tr>

                                </table>
                                </td>
                            </tr>
                            </table>
                        </body>
                        </html>
                    `
    

    sendEmail(email, "Verify Email", designe);
    createSendToken(newUser, 201, res);

})

const login = catchAsync(async (req, res, next) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return next(new AppError("Email and Password are required", 401));
    }

    const user = await User.findOne({email}).select("+password");

    if (!user) {
        return next(new AppError("User or Password is incorrect", 404));
    }

    const isValidUser = await user.comparePassword(password, user.password);

    if (!isValidUser) {
        return next(new AppError("Email or Password is incorrect", 401));
    }

    user.password = undefined

    return res.json({
        status: "succasse",
        data: {
            user
        }
    })

})


const verifyEmail = catchAsync(async (req, res, next) => {

    const { code } = req.params

    const user = await User.findOne({verificationCode: code});

    if (!user) return next(new AppError("User not found", 404));

    user.isVerified = true,
    user.verificationCode = undefined
    user.save({validateBeforeSave: false});

    res.status(200).send("Email is verified successfully");

})

module.exports = {sisgnUp, login, verifyEmail};