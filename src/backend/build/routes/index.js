"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var authentication_1 = require("../controllers/authentication");
var route = function (app) {
    app.get("/", function (req, res) {
        res.send("hi");
    });
    app.post("/signup", authentication_1.signUp);
};
exports.default = route;
