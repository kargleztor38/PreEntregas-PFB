import { Router } from "express";
import {
    addProductCart,
    createNewCart,
    delelteAllProducts,
    deleteOneProduct,
    getCartById,
    getCarts,
    updateMenyProductsCart,
    updateQtyProdCart,
} from "../controllers/carts.controllers.js";

const routerCart = new Router();

routerCart.get("/", getCarts);
routerCart.get("/:id", getCartById);
routerCart.post("/", createNewCart);
routerCart.post("/:idc", addProductCart);
routerCart.put("/:cid/product/:pid", updateQtyProdCart);
routerCart.put("/:cid", updateMenyProductsCart);
routerCart.delete("/:cid/product/:pid", deleteOneProduct);
routerCart.delete("/:cid", delelteAllProducts);

export default routerCart;
