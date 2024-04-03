import { Router } from "express";
import {
    addMenyPoruducts,
    addProduct,
    deleteOneById,
    getProductById,
    getProducts,
    updateProductById,
} from "../controllers/products.controllers.js";

const routerProd = new Router();

routerProd.get("/", getProducts);
routerProd.get("/:pid", getProductById);
routerProd.post("/", addProduct);
routerProd.post("/many", addMenyPoruducts);
routerProd.put("/:id", updateProductById);
routerProd.delete("/:id", deleteOneById);

export default routerProd;
