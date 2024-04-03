import { Router } from 'express'

import routerProd from "./products.routes.js";
import routerCart from "./carts.routes.js";
import viewsRouter from "./views.routes.js";
import routerAuth from "./auth.routes.js";

const indexRouter = new Router()

indexRouter.use("/api/products", routerProd);
indexRouter.use("/api/carts", routerCart);
indexRouter.use("/api/views", viewsRouter); // <-- VISTA PARA RENDERIZAR TODAS LAS VISTAS DE HANDLEBARS
indexRouter.use("/api/sessions", routerAuth);

export default indexRouter;