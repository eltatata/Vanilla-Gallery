import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: { unique: true }
    },
    password: {
        type: String,
        require: true,
        unique: true
    }
}, {
    timestamps: true
});

export const User = model("User", userSchema);