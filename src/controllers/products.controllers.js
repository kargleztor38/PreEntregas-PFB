import ProductSchema from "../services/prod.services.js";

const Product = new ProductSchema();

export const getProducts = async (req, res) => {
    try {
        const { sort, query } = req.query;
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 5;

        let myProd = await Product.getProduct(limit, page, query, sort);
        res.send(myProd);
    } catch (error) {
        console.log(error);
    }
};

export const getProductById = async (req, res) => {
    try {
        const { pid } = req.params;
        let myProdFind = await Product.getProductById(pid);
        res.send(myProdFind);
    } catch (error) {
        console.log(error);
    }
};

export const addProduct = async (req, res) => {
    try {
        const prodAdd = await Product.addProduct(req.body);
        res.send(prodAdd);
    } catch (error) {
        console.log(error);
    }
};

export const addMenyPoruducts = async (req, res) => {
    try {
        const all = await Product.addManyProducts(req.body);
        res.send(all);
    } catch (error) {
        console.log(error);
    }
};

export const updateProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const prodAdd = await Product.updateProductById(id, req.body);
        res.send(prodAdd);
    } catch (error) {
        console.log(error);
    }
};

export const deleteOneById = async (req, res) => {
    try {
        const { id } = req.params;
        const remove = Product.deleteOneById(id);
        res.send(remove);
    } catch (error) {
        console.log(error);
    }
};
