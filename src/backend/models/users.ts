import mongoose, { Schema } from "mongoose";

export interface IUser extends mongoose.Document {
    email: { type: string; unique: true; lowercase: true };
    password: string;
}

const userScehma = new Schema({
    email: String,
    password: String,
});
export { userScehma };
export default mongoose.model<IUser>("users", userScehma);
