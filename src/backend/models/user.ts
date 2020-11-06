// const mongoose = require("mongoose");
// const { Schema } = mongoose;
import mongoose, { Schema } from "mongoose";

export interface IUser extends mongoose.Document {
    email: { type: string; unique: true; lowercase: true };
    password: string;
}

const userScehma = new Schema({
    title: String,
    image: String,
});
export { userScehma };
export default mongoose.model<IUser>("user", userScehma);
