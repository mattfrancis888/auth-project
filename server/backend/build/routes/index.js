"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var authentication_1 = require("../controllers/authentication");
var passport_1 = require("../services/passport");
var passport_2 = __importDefault(require("passport"));
passport_2.default.use(passport_1.jwtLogin);
//authenticates if a user can log in / acess a specific resource
//We are not using cookie sessions, so we put in session: false
//const requireAuth = passport.authenticate("jwt", { session: false });
//requireAuth uses the jwtLogin strategy
var requireSignIn = passport_2.default.authenticate("local", { session: false });
passport_2.default.use(passport_1.localLogin);
var route = function (app) {
    //We want to ensure that the user token can acess specific resources in the page
    //To do so, we created the requireAuth middleware
    //THis is also known as a "protected route"
    //Example of using a strategy /Dummy Route:
    // app.get("/", requireAuth, (req, res) => {
    //     //If JWT token can be understood (only registered users have JWT tokens that are valid/can be read),
    //     // show this page
    //     res.send("hi");
    // });
    //We want to ensure that the user provided the proper email and password to log in
    //To do so, we created the requireSignIn middleware
    app.post("/signin", requireSignIn, authentication_1.signIn);
    app.post("/signup", authentication_1.signUp);
};
exports.default = route;
