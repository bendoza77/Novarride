const express = require("express");
const { getCars, getCar, createCar, deleteCar, updateCar } = require("../controllers/car.controller");
const { allowTo } = require("../middleware/auth.middleware");

const carRouter = express.Router();

// get cars

carRouter.get("/", allowTo("moderator", "admin", "user"), getCars);

// get car by id

carRouter.get("/", allowTo("moderator", "admin", "user"), getCar);

// post car

carRouter.post("/", allowTo("moderator", "admin"), createCar);

// delete car by id

carRouter.delete("/", allowTo("moderator", "admin"), deleteCar);

// update car by id

carRouter.patch("/", allowTo("moderator", "admin"), updateCar);


module.exports = carRouter
