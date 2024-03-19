import { Router } from 'express';
import productsDb from '../Dao/db/manager/prodMongoManager.js';

const views = new productsDb();
const viewsRouter = new Router();

viewsRouter.get('/realtimeproducts', async (req, res) => {
	res.render('realTimeProducts')
})

viewsRouter.get('/chat', (req, res) => {
	res.render('chat')
})
// TAREA --> VISTA PARA TODOS LOS PRODUCTOS
viewsRouter.get('/products', async (req, res) => {
	const { sort, query } = req.query;
	const page = parseInt(req.query.page, 10) || 1
	const limit = parseInt(req.query.limit, 10) || 5
	const products = await views.getProduct(limit, page, query, sort)
	// console.log(products)
	res.render('products/productsViews', {products: products})
})

// TAREA --> VISTA PARA TODOS LOS PRODUCTOS DE UN CARRITO
viewsRouter.get('/carts', async (req, res) => {
	res.render('carts/oneCart', )
})

export default viewsRouter