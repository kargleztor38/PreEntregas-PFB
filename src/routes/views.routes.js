import { Router } from 'express';
import ProductManager from '../controllers/productsManager.js';

const myViews = new ProductManager();
const viewsRouter = new Router();

viewsRouter.get('/', async (req, res) => {
	const allProducts = await myViews.getProduct()
	res.render('home', { title: 'Express HandleBars end WebSocket', products: allProducts })
})

viewsRouter.get('/realtimeproducts', async (req, res) => {
	res.render('realTimeProducts')
})

export default viewsRouter