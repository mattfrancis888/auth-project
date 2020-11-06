import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import route from "./routes";

if (process.env.NODE_ENV !== "production") {
    //We don't need dotenv when in production
    dotenv.config();
}
if (process.env.mongoURI) {
    mongoose.connect(process.env.mongoURI, { useNewUrlParser: true }, () => {
        console.log("connected");
    });
}
const app = express();

app.use(cors());
route(app);
const port = 5000;

app.listen(port, () => {
    console.log(`App running on port ${port}.`);
});
