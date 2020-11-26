import { signUp, signIn } from "../controllers/authentication";
import { Express } from "express";
import { jwtLogin, localLogin } from "../services/passport";
import passport from "passport";

passport.use(jwtLogin);
//authenticates if a user can log in / acess a specific resource
//We are not using cookie sessions, so we put in session: false
//const requireAuth = passport.authenticate("jwt", { session: false });
//requireAuth uses the jwtLogin strategy

const requireSignIn = passport.authenticate("local", { session: false });
passport.use(localLogin);

const route = (app: Express) => {
    //We want to ensure that the user token can acess specific resources in the page
    //To do so, we created the requireAuth middleware
    //THis is also known as a "protected route"
    //Example of using a strategy /Dummy Route:
    // app.get("/", requireAuth, (req, res) => {
    //     //If JWT token can be understood (only registered users have JWT tokens that are valid/can be read),
    //     // show this page
    //     res.send("hi");
    // });
    
    //We want to ensure that the user provided the proper email and password to log in
    //To do so, we created the requireSignIn middleware
    app.post("/signin", requireSignIn, signIn);
    app.post("/signup", signUp);
};

export default route;
