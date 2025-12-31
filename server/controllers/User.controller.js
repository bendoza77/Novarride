const { default: mongoose } = require("mongoose");
const User = require("../models/user.model");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

// get all users

const getUsers = catchAsync(async (req, res, next) => {

    const users = await User.find();

    return res.json(users);

})

// get user by id

const getUserById = catchAsync(async (req, res, next) => {

    const { id } = req.query

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new AppError("Enter valid id", 400));
    }

    const user = await User.findById(id);

    if (!user) {
        return next(new AppError("User not found", 404));
    }

    return res.json(user);

})

// delete user by id

const deleteUserById = catchAsync(async (req, res, next) => {

    const { id } = req.query

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new AppError("Enter valid id", 400));
    }

    await User.findByIdAndDelete(id);

    return res.status(204).send();

})


// update user info

const updateUser = catchAsync(async (req, res, next) => {

    const { id } = req.query;
    const data = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new AppError("Enter valid id", 400));
    }

    const user = await User.findByIdAndUpdate(id, data);

    return res.json(user);
})

module.exports = {
    getUsers,
    getUserById,
    updateUser,
    deleteUserById
}
