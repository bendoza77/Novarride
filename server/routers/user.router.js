const express = require("express");
const { getUsers, getUserById, createUser, deleteUserById, updateUser } = require("../controllers/User.controller");

const userRouter = express.Router();

// get all users

userRouter.get("/", allowTo("moderator", "admin"), getUsers);

// get user by id

userRouter.get("/", allowTo("moderator", "admin"), getUserById);

// delete user by id

userRouter.delete("/", allowTo("moderator", "admin"), deleteUserById);

// patch user by id

userRouter.patch("/", allowTo("moderator", "admin"), updateUser);

module.exports = userRouter