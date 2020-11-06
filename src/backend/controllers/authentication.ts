import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import User from "../models/users";

export const signUp = (req: Request, res: Response, next: NextFunction) => {
    //If user with given email exists
    const email = req.body.email;
    const password = req.body.password;
    console.log(email);
    //If email already exist, return an error
    User.findOne(
        { email: email },
        (err: ErrorRequestHandler, existingUser: Object) => {
            if (err) return next(err);
            if (existingUser) {
                //422 is UNPROCESSABLE_ETITY; data user gave was "bad/unproceesssed"
                return res.status(422).send({ error: " Email in use" });
            }
            //If a user with email does NOT exist

            const user = new User({
                email: email,
                password: password,
            });

            user.save((err) => {
                if (err) return next(err);
                res.json(user);
            });

            //Respond to request indicating user was created
        }
    );
    //
};
