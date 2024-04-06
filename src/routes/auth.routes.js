import { Router } from "express";
import passport from "passport";
import { login, logout, viewUser } from "../controllers/auth.controllers.js";

const routerAuth = new Router();

routerAuth.post(
    "/localregister",
    passport.authenticate("local", { failureRedirect: "error" }),
    (req, res) => {
        res.render( "sessions/login" );
    }
);

routerAuth.get(
    "/jwtegister",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        res.render( "sessions/login" );
    }
);

routerAuth.post( "/login", login );

routerAuth.get( '/current', viewUser );

routerAuth.get( "/logout", logout );

export default routerAuth;
