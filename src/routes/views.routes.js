import { Router } from "express";
import {
    displayProducts,
    productsCarts,
    productsPaginate,
    viewChat,
    viewError,
    viewRealTimeProducts,
    viewlogin,
    viewPl,
    viewPjwt,
} from "../controllers/views.constrollers.js";

const viewsRouter = new Router();

viewsRouter.get("/", displayProducts);
viewsRouter.get("/realtimeproducts", viewRealTimeProducts);
viewsRouter.get("/chat", viewChat);
viewsRouter.get("/products", productsPaginate);
viewsRouter.get("/carts/:cid", productsCarts);

// Vistas de registro, login, perfil
viewsRouter.get("/form-local", viewPl); // <-- REGISTRO CON PASSPORT-LOCAL
viewsRouter.get("/form-jwt", viewPjwt); // <-- REGISTRO CON PASSPORT-JWT
viewsRouter.get("/viewlogin", viewlogin); // <-- VISTA DE LOGIN
viewsRouter.get("/error", viewError); // <-- VISTA DEL ERROR

export default viewsRouter;
