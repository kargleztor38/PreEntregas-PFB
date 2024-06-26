import passport from "passport";
import LocalStrategy from "passport-local";
import JwtStrategy from "passport-jwt";
import { ExtractJwt } from "passport-jwt";
import User from "../models/user.model.js";

import { createHash, passwordValidate } from "../libs/bcrypt.js";
import { createToken } from "../libs/jwt.js";
import Carts from "../models/carts.model.js";

// Estrategia de registro con PASSPORT-LOCAL
export const initPassportLocal = () => {
    passport.use(
        "local",
        new LocalStrategy.Strategy(
            { usernameField: "email", passReqToCallback: true },
            async (req, username, password, done) => {
                try {
                    let data = req.body;
                    let findUser = await User.findOne({ email: username });
                    if (findUser) done("Usuario ya registrado");

                    const newCart = new Carts({
                        user: data.firstName
                    })

                    let userNew = {
                        firstName: data.firstName,
                        lastName: data.lastName,
                        email: username,
                        age: data.age,
                        password: createHash(data.password),
                        cart: newCart,
                        role: data.role,
                    };

                    let userReady = await User.create(userNew);
                    done(null, userReady);                    
                } catch (error) {
                    done("Error al registrarse" + error);
                }
            }
        )
    );
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });
    passport.deserializeUser((id, done) => {
        let user = User.findById(id);
        done(null, user);
    });
};
let cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies["cookieToken"];
    }
    return token;
};
// Estrategia de registro con PASSPORT-JWT
export const initPassportJwt = () => {
    passport.use(
        "jwt",
        new JwtStrategy.Strategy(
            {
                jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
                secretOrKey: "ecommerceSecret",
            },
            async (payload, done) => {
                try {
                    return done(null, payload);
                } catch (error) {
                    return done("Error en JWT passport", error);
                }
            }
        )
    );
};
// Login
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).render( 'viewsErrors/no-register' );

        const isMatch = await passwordValidate(user, password);
        if (!isMatch) return res.status(400).json({ message: "Error al iniciar sesión" });
        
        const userObj = {}
        userObj.firstName = user.firstName
        userObj.lastName = user.lastName
        userObj.email = user.email
        userObj.age = user.age
        userObj.cart = user.cart
        userObj.role = user.role

        const token = createToken({ id: user._id });
        res.cookie("cookieToken", token, { httpOnly: true }).render('sessions/profile', { usuario: userObj })
    } catch (error) {
        console.log(error);
    }
};
// Mostrando el usuario registrado
export const viewUser = ( req, res ) => {
    res.render( 'sessions/viewUser' )
}
// Logout
export const logout = ( req, res ) => {
    res.clearCookie('cookieToken').send('Cookie eliminada')
};