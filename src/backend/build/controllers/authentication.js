"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUp = void 0;
var users_1 = __importDefault(require("../models/users"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var tokenForUser = function (user) {
    if (process.env.privateKey) {
        //iat- issued at  property is implemented by default
        return jsonwebtoken_1.default.sign({ subject: user.id }, process.env.privateKey);
    }
};
exports.signUp = function (req, res, next) {
    //If user with given email exists
    var email = req.body.email;
    var password = req.body.password;
    var UNPROCESSABLE_ENTITY_STATUS = 422;
    //Email or password not given
    if (!email || !password) {
        return res
            .status(UNPROCESSABLE_ENTITY_STATUS)
            .send({ error: "Email and password must be provided" });
    }
    //If email already exist, return an error
    users_1.default.findOne({ email: email }, function (err, existingUser) {
        if (err)
            return next(err);
        if (existingUser) {
            //422 is UNPROCESSABLE_ETITY; data user gave was "bad/unproceesssed"
            return res
                .status(UNPROCESSABLE_ENTITY_STATUS)
                .send({ error: "Email in use" });
        }
        //If a user with email does NOT exist
        var user = new users_1.default({
            email: email,
            password: password,
        });
        user.save(function (err) {
            if (err)
                return next(err);
            res.send({ token: tokenForUser(user) });
        });
        //Respond to request indicating user was created
    });
    //
};
