"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtLogin = void 0;
var users_1 = __importDefault(require("../models/users"));
var passport_jwt_1 = require("passport-jwt");
var dotenv_1 = __importDefault(require("dotenv"));
//We use passport to figure out if a user is authenticated in our application
//passport strategy is used to figure out if the user is authenticated in a "particular way"
if (process.env.NODE_ENV !== "production") {
    //We don't need dotenv when in production
    dotenv_1.default.config();
}
var jwtOptions = {
    //jwtFromRequest tells the Strategy where to find the token / "payload".
    //We want to find it in "Headers" that's named "authorization"
    //"authorization" contains a JWT token that we generated with subject(the user id) and  and the private key in authentication.ts
    //We can "read" the token / the "payload", which contains the subject and the iat created in authenticaiton.ts.
    //This is demonstrated in jwtLogin
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromHeader("authorization"),
    //We also want to tell our Strategy what the "secret key" that was used to generate the token in authentication.ts
    secretOrKey: process.env.privateKey,
};
//Create strategy that authenticates if a user can log in
exports.jwtLogin = new passport_jwt_1.Strategy(jwtOptions, function (payload, done) {
    //Refer to comment in jwtOoptions. . The payload is read by JWT and it contains
    // the subject and iat that's defined in authentication.ts
    //Check if user id in the paylod is in our database
    //Reminder that 'subject' is user id
    console.log(payload);
    users_1.default.findById(payload.subject, function (err, user) {
        //done() is just a non-official standard name for a function (a.k.a callback)
        //that informs the calling function (parent in stacktrace) that a task is completed.
        if (err)
            return done(err, false);
        //Second param in done(), it asks if there is a user is returned
        if (user) {
            done(null, user);
        }
        else {
            done(null, false);
        }
    });
});
