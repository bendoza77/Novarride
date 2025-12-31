const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const globalErrorHandler = require("./controllers/error.controller");
const carRouter = require("./routers/car.router");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRouter = require("./routers/auth.router");
const path = require("path");
require("dotenv").config();

const app = express();

if (process.env.NODE_ENV === "dev") {
    app.use(morgan("dev"));
}

app.use(express.static(path.join(__dirname, "dist")));

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["POST", "GET", "PATCH", "DELETE"],
    credentials: true
}))

// create router

app.use("/api/cars", carRouter);
app.use("/api/users", authRouter);

app.use(globalErrorHandler);


mongoose.connect(process.env.DATABASE_URL)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Server is running at port ${process.env.PORT}`)
        })
    }).catch((error) => {
        console.log(error);
        process.exit(1);
    })


