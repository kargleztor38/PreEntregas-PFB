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
viewsRouter.get("/formlocal", viewPl);
viewsRouter.get("/formjwt", viewPjwt);
viewsRouter.get("/viewlogin", viewlogin);
viewsRouter.get("/error", viewError);

export default viewsRouter;
