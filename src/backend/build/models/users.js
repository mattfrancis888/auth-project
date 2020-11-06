"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userScehma = void 0;
var mongoose_1 = __importStar(require("mongoose"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var userScehma = new mongoose_1.Schema({
    email: String,
    password: String,
});
exports.userScehma = userScehma;
userScehma.pre("save", function (next) {
    //https://stackoverflow.com/questions/46182826/mongoose-hooks-not-working-with-typescript
    //Arrow functions cannot have 'this' as param
    var user = this;
    var saltRounds = 10;
    bcrypt_1.default.hash(user.password, saltRounds, function (err, hash) {
        // Now we can store the password hash in db.
        if (err) {
            return next(err);
        }
        console.log(hash);
        //Override current text password with hash
        user.password = hash;
        next();
    });
});
exports.default = mongoose_1.default.model("users", userScehma);
