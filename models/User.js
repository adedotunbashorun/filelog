const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    first_name: { type: String, default: null },
    last_name: { type: String, default: null },
    username: { type: String, required: true, index: { unique: true } },
    email: {
        type: String,
        lowercase: true,
        required: true,
        validate: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email address"],
        // match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email address"],
        index: { unique: true },
    },
    phone: { type: String},
    password: { type: String},
    profile_image: { type: String, default: null },
    cloud_image: { type: String, default: null },
    is_active: { type: Boolean, default: false },
    deleted_at: {type: String, default: null },
}, { timestamps: true });

userSchema.methods.comparePassword = function(candidatePassword) {
    return bcrypt.compareSync(candidatePassword, this.password);
};

userSchema.methods.fullName = function() {
    return (this.firstName.trim() + " " + this.lastName.trim());
};

module.exports = mongoose.model("User", userSchema);
