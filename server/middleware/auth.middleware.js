const User = require("../models/user.model");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");

const allowTo = (...roles) => {

    return (req, res, next) => {

        if (!req.user) return next();

        if (!roles.includes(req.user.role)) {
            return next(new AppError("You dont have perrmission", 403))
        }

        next();

    }


}

const protect = catchAsync(async (req, res, next) => {

    try {

        const ls = req.cookies?.ls;
        
        if (!ls) {
            return next(new AppError("User is not login to accounte", 401));
        }

        const decode = jwt.verify(ls, process.env.JWT_SECRET);

        if (!decode) {
            return next(new AppError("ls is invalid", 401));
        }

        console.log(decode);

        const user = await User.findById(decode.id);

        console.log(user);

        if (!user) {
            return next(new AppError("User not found", 404));
        }

        req.user = user;

        next();

    } catch (error) {
        console.log(error);
    }

})

module.exports = {protect, allowTo};