import { Router } from "express";
import {
    addProductCart,
    createNewCart,
    deleteAllProducts,
    deleteOneProduct,
    getCartById,
    getCarts,
    updateManyProductsCart,
    updateQtyProdCart,
} from "../controllers/carts.controllers.js";

const routerCart = new Router();

routerCart.get("/", getCarts);
routerCart.get("/:id", getCartById);
routerCart.post("/", createNewCart);
routerCart.post("/:idc", addProductCart);
routerCart.put("/:cid/product/:pid", updateQtyProdCart);
routerCart.put("/:cid", updateManyProductsCart);
routerCart.delete("/:cid/product/:pid", deleteOneProduct);
routerCart.delete("/:cid", deleteAllProducts);

export default routerCart;
