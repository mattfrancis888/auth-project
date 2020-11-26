"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var route = function (app) {
    app.get("/", function (req, res) {
        res.send("hi");
    });
};
exports.default = route;
