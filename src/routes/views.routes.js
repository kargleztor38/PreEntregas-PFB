import { Router } from 'express';
import productsDb from '../Dao/db/manager/prodMongoManager.js';

const viewsDB = new productsDb();
const viewsRouter = new Router();

viewsRouter.get('/', async (req, res) => {
	const allProducts = await viewsDB.getProduct()
	res.render('home', { title: 'Express HandleBars end WebSocket', products: allProducts })
})

viewsRouter.get('/realtimeproducts', async (req, res) => {
	res.render('realTimeProducts')
})

viewsRouter.get('/chat', (req, res) => {
	res.render('chat')
})

export default viewsRouter