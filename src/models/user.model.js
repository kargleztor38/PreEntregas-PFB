import mongoose, { Schema } from "mongoose";
import Carts from "./carts.model.js";

const user = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    age: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    cart: {
        type: Schema.Types.ObjectId,
        ref: Carts,
    },
    role: {
        type: String,
        default: "user"
    }
});

const User = mongoose.model("users", user);
export default User;
