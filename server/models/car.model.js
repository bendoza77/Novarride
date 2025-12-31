const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({

    title: {
        type: String,
        required: [true, "title is required"],
        unique: true,
        minlength: [5, "title length can't be less than 5"],
        maxlength: [10, "title length can't be greater than 10"]
    },

    carImage: String,

    carType: {
        type: String,
        required: [ true, "car type is required"],
    },

    passenger: {
        type: Number,
        required: [true, "car passenger is required"],
    },

    transmission: {
        type: String,
        required: [true, "car transmission is required"],
    },

    carAge: {
        type: Number,
        min: 1,
        max: 10,
        required: [true, "car age is required"]
    },

    luggage: {
        type: Number,
        min: 1,
        max: 5,
        required: [true, "luggage is required"]
    },

    airCondition: {
        type: String,
        required: [true, "air condition is required"]
    },

    pircePerDay: {
        type: Number,
        min: 90,
        max: 210,
        required: [true, "price per day is required"]
    }

})

const Car = mongoose.model("Cars", carSchema);

module.exports = Car