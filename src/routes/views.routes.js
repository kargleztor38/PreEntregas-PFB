import { Router } from 'express';
import productsDb from '../Dao/db/manager/prodMongoManager.js'
import handleCart from '../Dao/db/manager/cartsMongoManager.js';

const productsV = new productsDb();
const cartView = new handleCart();
const viewsRouter = new Router();

viewsRouter.get('/', async (req, res) => {
	const { limit = 5, page = 1, sort, query } = req.query;
	const allProducts = await productsV.getProduct(limit, page, query, sort)
	
	res.render('home', { title: 'Express HandleBars end WebSocket', products: allProducts })
})

viewsRouter.get('/realtimeproducts', async (req, res) => {
	res.render('realTimeProducts')
})

viewsRouter.get('/chat', (req, res) => {
	res.render('chat')
})

viewsRouter.get('/products', async (req, res) => {
	const { sort, query } = req.query;
	const page = parseInt(req.query.page, 10) || 1
	const limit = parseInt(req.query.limit, 10) || 8

	const products = await productsV.getProduct( limit, page, query, sort )
	
	const others = {}
	others.status = products.status
	others.prevPage = products.prevPage !== null ? products.prevPage : 'No hay'
	others.nextPage = products.nextPage !== null ? products.nextPage : 'Ultima pagina'
	others.nextlink = products.nextLink
	others.prevlink = products.prevLink
	others.totalPages = products.totalPages
	others.page = products.page
	others.payload = products.payload.map(ele => ele.toObject({ getters: true }))
	
	res.render('products/productsViews', {  paginate: others })	
})

// TAREA --> VISTA PARA TODOS LOS PRODUCTOS DE UN CARRITO
viewsRouter.get('/carts/:cid', async (req, res) => {
	const { cid } = req.params
	const cart = await cartView.getCartById( cid )

	res.render('carts/oneCart', { carts: cart })
})

export default viewsRouter;