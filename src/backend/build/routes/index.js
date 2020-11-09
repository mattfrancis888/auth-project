"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var authentication_1 = require("../controllers/authentication");
var passport_1 = require("../services/passport");
var passport_2 = __importDefault(require("passport"));
passport_2.default.use(passport_1.jwtLogin);
//We are not using cookie sessions, so we put in session: false
var requireAuth = passport_2.default.authenticate("jwt", { session: false });
//requireAuth uses the jwtLogin strategy
var route = function (app) {
    app.get("/", requireAuth, function (req, res) {
        //If JWT token can be understood by a registered user, show this page
        res.send("hi");
    });
    app.post("/signup", authentication_1.signUp);
};
exports.default = route;
