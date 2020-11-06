"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
exports.errorHandler = function (err, req, res, next) {
    res.status(500);
    res.render("error", { error: err });
};
