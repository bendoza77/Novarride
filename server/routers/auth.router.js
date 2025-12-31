const express = require("express");
const { sisgnUp, login } = require("../controllers/auth.controller");
const { protect } = require("../middleware/auth.middleware");

const authRouter = express.Router();

authRouter.post("/signup", sisgnUp);

authRouter.post("/login", protect, login);

module.exports = authRouter