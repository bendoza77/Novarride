const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

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
    }],

    verificationCode: String,

    isVerified: {
        type: Boolean,
        default: false
    }
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

userSchema.methods.createVerificationCode = function() {

    const code = crypto.randomBytes(12).toString("hex");
    this.verificationCode = code;
    return code;


}

const User = mongoose.model("Users", userSchema);

module.exports = User