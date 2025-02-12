const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const companySchema = new Schema({
    companyName: {
        type: String,
        required: true,
        trim: true,
    },
    companyType: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true })

// Pre-save hook to hash password before saving
companySchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

const Company = model("company", companySchema);
module.exports = Company