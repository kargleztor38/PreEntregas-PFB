import { Router } from 'express';
import productsDb from '../Dao/db/manager/prodMongoManager.js';


const views = new productsDb();
const viewsRouter = new Router();

viewsRouter.get('/', async (req, res) => {
	const { limit = 5, page = 1, sort, query } = req.query;
	const allProducts = await views.getProduct(limit, page, query, sort)
	console.log(allProducts)
	res.render('home', { title: 'Express HandleBars end WebSocket', products: allProducts })
})

viewsRouter.get('/realtimeproducts', async (req, res) => {
	res.render('realTimeProducts')
})

viewsRouter.get('/chat', (req, res) => {
	res.render('chat')
})

export default viewsRouter