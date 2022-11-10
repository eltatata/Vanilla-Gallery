import mongoose from "mongoose";
const { Schema, model } = mongoose;

const imageSchema = new Schema({
    name: {
        type: String,
        require: true
    }
}, {
    timestamps: true
});

export const Img = model("Img", imageSchema);