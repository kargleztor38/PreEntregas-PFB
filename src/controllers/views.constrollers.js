import productsDb from "../services/prod.services.js";

const productsV = new productsDb();

export const displayProducts = async (req, res) => {
    const { limit = 5, page = 1, sort, query } = req.query;
    const allProducts = await productsV.getProduct(limit, page, query, sort);

    res.render("home", {
        title: "Express HandleBars end WebSocket",
        products: allProducts,
    });
};
export const productsPaginate = async (req, res) => {
    const { sort, query } = req.query;
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 8;

    const products = await productsV.getProduct(limit, page, query, sort);

    const others = {};
    others.status = products.status;
    others.prevPage = products.prevPage !== null ? products.prevPage : "No hay";
    others.nextPage =
        products.nextPage !== null ? products.nextPage : "Ultima pagina";
    others.nextlink = products.nextLink;
    others.prevlink = products.prevLink;
    others.totalPages = products.totalPages;
    others.page = products.page;
    others.payload = products.payload.map((ele) =>
        ele.toObject({ getters: true })
    );

    res.render("products/productsViews", { paginate: others });
};
export const productsCarts = async (req, res) => {
    const { cid } = req.params;
    const cart = await cartView.getCartById(cid);

    res.render("carts/oneCart", { carts: cart });
};
export const viewPl = (req, res) => {
    res.render("sessions/passport-local");
};
export const viewPjwt = (req, res) => {
    res.render("sessions/passport-jwt");
};

export const viewlogin = (req, res) => {
    res.render("sessions/login");
};
export const viewError = (req, res) => {
    res.render("errorview");
};
export const viewChat = (req, res) => {
    res.render("chat");
};
export const viewRealTimeProducts = async (req, res) => {
    res.render("realTimeProducts");
};
