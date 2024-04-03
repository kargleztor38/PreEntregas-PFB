import { Router } from 'express';
import productsDb from '../Dao/db/manager/prodMongoManager.js'
import handleCart from '../Dao/db/manager/cartsMongoManager.js';

const viewsRouter = new Router();

viewsRouter.get('/', async (req, res) => {
	const { limit = 5, page = 1, sort, query } = req.query;
	const allProducts = await productsV.getProduct(limit, page, query, sort)
	
	res.render('home', { title: 'Express HandleBars end WebSocket', products: allProducts })
})

viewsRouter.get('/realtimeproducts', async (req, res) => {
	res.render('realTimeProducts')
})
