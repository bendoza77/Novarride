const jwt = require("jsonwebtoken");
const ms = require("ms");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const User = require("../models/user.model");

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

    const { fullName, email, password, phone, role, reviewId } = req.body;

    if (!fullName || !email || !password || !phone) {
        return next(new AppError("All field is required", 401));
    }

    const newUser = await User.create({
        fullName,
        email,
        password,
        phone,
        role,
        reviewId
    })

    
    createSendToken(newUser, 201, res);

})

const login = catchAsync(async (req, res, next) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return next(new AppError("Email and Password are required", 401));
    }

    const user = await User.findOne({email}).select("+password");

    if (!user) {
        return next(new AppError("User not found", 404));
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

module.exports = {sisgnUp, login};