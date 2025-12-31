const { default: mongoose } = require("mongoose");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const Car = require("../models/car.model");

// get all car objects

const getCars = catchAsync( async (req, res, next) => {

    const car = await Car.find();

    return res.json(car);

})

// get car by id

const getCar = catchAsync( async (req, res, next) => {

    const { id } = req.query

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new AppError("Id is invalid", 400));
    }

    const car = await Car.findById(id);

    if (!car) {
        return next(new AppError("Car not found", 404))
    }

    return res.json(car);

})

// create car

const createCar = catchAsync( async (req, res, next) => {

    const { title, carType, passenger, transmission, carAge, luggage, airCondition, pircePerDay } = req.body

    if (title === null || carType === null || passenger === null || transmission === null || carAge === null || luggage === null || airCondition === null || pircePerDay === null) {
        return next(new AppError("all field is required", 400));
    }

    const newCar = await Car.create({
        title,
        carType,
        passenger,
        carAge,
        luggage,
        airCondition,
        pircePerDay,
        transmission
    })

    return res.status(201).json(newCar);

})

// delete car by id

const deleteCar = catchAsync( async (req, res, next) => {

    const { id } = req.query;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new AppError("Id is invalid", 400));
    }

    await Car.findByIdAndDelete(id);

    return res.json({
        status: "succasse",
        message: "Car was deleted"
    });

})

// update car info by id

const updateCar = catchAsync( async (req, res, next) => {

    const { id } = req.query
    const data = req.body

    if (mongoose.Types.ObjectId.isValid(id)) {
        return next(new AppError("Id is innvalid", 400));
    }

    const updateCar = await Car.findByIdAndUpdate(id, data);

    return res.json(updateCar);

})

module.exports = { 
    getCars,
    getCar,
    createCar,
    updateCar,
    deleteCar,
}