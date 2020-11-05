"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var cors_1 = __importDefault(require("cors"));
if (process.env.NODE_ENV !== "production") {
    //We don't need dotenv when in production
    dotenv_1.default.config();
}
var app = express_1.default();
app.use(cors_1.default());
var port = 5000;
app.get("/", function (req, res) {
    res.send("hi");
});
app.listen(port, function () {
    console.log("App running on port " + port + ".");
});
