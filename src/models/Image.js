import mongoose from "mongoose";
const { Schema, model } = mongoose;

const imageSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    userID: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: true
});

export const Img = model("Img", imageSchema);