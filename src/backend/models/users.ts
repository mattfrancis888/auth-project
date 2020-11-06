import mongoose, { Schema } from "mongoose";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";

export interface IUser extends mongoose.Document {
    email: { type: string; unique: true; lowercase: true };
    password: string;
}

const userScehma = new Schema({
    email: String,
    password: String,
});

userScehma.pre("save", function (this: IUser, next) {
    //https://stackoverflow.com/questions/46182826/mongoose-hooks-not-working-with-typescript
    //Arrow functions cannot have 'this' as param
    const user = this;
    const saltRounds = 10;
    bcrypt.hash(user.password, saltRounds, (err, hash) => {
        // Now we can store the password hash in db.
        if (err) {
            return next(err);
        }
        console.log(hash);
        //Override current text password with hash
        user.password = hash;
        next();
    });
});
export { userScehma };
export default mongoose.model<IUser>("users", userScehma);
