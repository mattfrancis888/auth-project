"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
//https://stackoverflow.com/questions/47002688/rest-api-only-in-express-getting-error-no-default-engine-was-specified-and-no
exports.errorHandler = function (err, req, res) {
    res.status(500);
    res.send({ error: err });
};
