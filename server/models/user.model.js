const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({

    fullName: {
        type: String,
        require: [true, "User fullname is required"]
    },

    profileImage: String,

    email: {
        type: String,
        unique: [true, "User email must be unique"],
        require: [true, "User email is required"]
    },

    phone: {
        type: String,
        unique: [true, "User phone number must be unique"],
        require: [true, "User phone number is required"]
    },

    password: {
        type: String,
        require: [true, "User password is required"],
        minLength: [8, "User password cant't be less than 8 character"],
        maxLength: [20, "User password can't be more than 20 character"]
    },

    role: {
        enum: ["user", "admin", "moderator"],
        type: String,
        default: "user"
    },

    reviewId: [{
        type: mongoose.Types.ObjectId,
        ref: "Reviews"
    }]
})

userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) {
        return next();
    }

    this.password = await bcrypt.hash(this.password, 12);

    next();
})

userSchema.methods.comparePassword = async (candidate, password) => {
    return await bcrypt.compare(candidate, password);
}

const User = mongoose.model("Users", userSchema);

module.exports = User