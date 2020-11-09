import { signUp } from "../controllers/authentication";
import { Express } from "express";
import { jwtLogin } from "../services/passport";
import passport from "passport";

passport.use(jwtLogin);
//We are not using cookie sessions, so we put in session: false
const requireAuth = passport.authenticate("jwt", { session: false });
//requireAuth uses the jwtLogin strategy
const route = (app: Express) => {
    app.get("/", requireAuth, (req, res) => {
        //If JWT token can be understood by a registered user, show this page
        res.send("hi");
    });
    app.post("/signup", signUp);
};

export default route;
