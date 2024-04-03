import handleCart from "../services/carts.services.js";
const carts = new handleCart();

export const getCarts = async (req, res) => {
    try {
        const allCarts = await carts.getCarts();
        res.send(allCarts);
    } catch (err) {
        console.log(err);
    }
};
export const getCartById = async (req, res) => {
    try {
        const { id } = req.params;
        const cartFind = await carts.getCartById(id);
        res.send(cartFind);
    } catch (err) {
        res.send("Error en la busqueda", err);
    }
};
export const createNewCart = async (req, res) => {
    try {
        const product = req.body;
        await carts.createNewCart(product);
        res.send("Producto agregado correctamente");
    } catch (err) {
        res.send(err);
    }
};
export const addProductCart = async (req, res) => {
    try {
        const { idc } = req.params;
        const { idp } = req.query;

        const resp = await carts.addProductCart(idc, idp);

        res.send(resp);
    } catch (err) {
        console.log(err);
    }
};
export const updateQtyProdCart = async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;

        const updatQuantity = await carts.updateQtyProdCart(cid, quantity, pid);
        updatQuantity === true
            ? res.status(200).send("Producto actualizado")
            : res.status(404).send("Producto no encontrado");
    } catch (err) {
        console.log(err);
    }
};
export const updateMenyProductsCart = async (req, res) => {
    try {
        const { cid } = req.params;
        const arrayP = req.body;

        const update = await carts.updateMenyProductsCart(cid, arrayP);
        if (update === true) {
            res.status(200).send("Array de productos actualizados");
        } else {
            res.status(404).send(update);
        }
    } catch (err) {
        res.status(500).send("Error en el servidor");
    }
};
export const deleteOneProduct = async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const resp = await carts.deleteOneProduct(cid, pid);
        if (resp !== null) {
            res.status(200).send("Producto eliminado del carrito");
        } else {
            res.status(404).send("Producto no encontrado");
        }
    } catch (err) {
        res.status(500).send("Problemas al realizar la operacion: " + err);
    }
};
export const delelteAllProducts = async (req, res) => {
    try {
        const { cid } = req.params;
        const remove = await carts.delelteAllProducts(cid);
        if (remove === true) {
            res.status(200).send("El carrito se a vaceado");
        } else {
            res.status(404).send("Carrito no encontrado");
        }
    } catch (err) {
        return res.status(500).send("Problemas con el servidor: " + err);
    }
};
