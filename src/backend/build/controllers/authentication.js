"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUp = void 0;
var users_1 = __importDefault(require("../models/users"));
exports.signUp = function (req, res, next) {
    //If user with given email exists
    var email = req.body.email;
    var password = req.body.password;
    console.log(email);
    //If email already exist, return an error
    users_1.default.findOne({ email: email }, function (err, existingUser) {
        if (err)
            return next(err);
        if (existingUser) {
            //422 is UNPROCESSABLE_ETITY; data user gave was "bad/unproceesssed"
            return res.status(422).send({ error: " Email in use" });
        }
        //If a user with email does NOT exist
        var user = new users_1.default({
            email: email,
            password: password,
        });
        user.save(function (err) {
            if (err)
                return next(err);
            res.json(user);
        });
        //Respond to request indicating user was created
    });
    //
};
