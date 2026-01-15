const express = require("express");
const { sisgnUp, login, verifyEmail } = require("../controllers/auth.controller");
const { protect } = require("../middleware/auth.middleware");

const authRouter = express.Router();

authRouter.post("/signup", sisgnUp);

authRouter.post("/login", login);

authRouter.post("/verify/:code", verifyEmail);

module.exports = authRouter