"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var cors_1 = __importDefault(require("cors"));
var mongoose_1 = __importDefault(require("mongoose"));
var routes_1 = __importDefault(require("./routes"));
if (process.env.NODE_ENV !== "production") {
    //We don't need dotenv when in production
    dotenv_1.default.config();
}
if (process.env.mongoURI) {
    mongoose_1.default.connect(process.env.mongoURI, { useNewUrlParser: true }, function () {
        console.log("connected");
    });
}
var app = express_1.default();
app.use(cors_1.default());
routes_1.default(app);
var port = 5000;
app.listen(port, function () {
    console.log("App running on port " + port + ".");
});
