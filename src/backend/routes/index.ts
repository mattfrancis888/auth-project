import { signUp } from "../controllers/authentication";
import { Express } from "express";

const route = (app: Express) => {
    app.get("/", (req, res) => {
        res.send("hi");
    });
    app.post("/signup", signUp);
};

export default route;
