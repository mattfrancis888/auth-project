import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import User, { IUser } from "../models/users";
import jwt from "jsonwebtoken";
const tokenForUser = (user: IUser) => {
    if (process.env.privateKey) {
        //iat- issued at  property is implemented by default
        return jwt.sign({ subject: user.id }, process.env.privateKey);
    }
};
export const signUp = (req: Request, res: Response, next: NextFunction) => {
    //If user with given email exists
    const email = req.body.email;
    const password = req.body.password;

    const UNPROCESSABLE_ENTITY_STATUS = 422;
    //Email or password not given
    if (!email || !password) {
        return res
            .status(UNPROCESSABLE_ENTITY_STATUS)
            .send({ error: "Email and password must be provided" });
    }

    //If email already exist, return an error
    User.findOne(
        { email: email },
        (err: ErrorRequestHandler, existingUser: Object) => {
            if (err) return next(err);
            if (existingUser) {
                //422 is UNPROCESSABLE_ETITY; data user gave was "bad/unproceesssed"
                return res
                    .status(UNPROCESSABLE_ENTITY_STATUS)
                    .send({ error: "Email in use" });
            }
            //If a user with email does NOT exist
            const user = new User({
                email: email,
                password: password,
            });

            user.save((err) => {
                if (err) return next(err);
                res.send({ token: tokenForUser(user) });
            });

            //Respond to request indicating user was created
        }
    );
    //
};
