import { Router } from 'express';
import ProductManager from '../controllers/productsManager.js';

const myViews = new ProductManager();
const routerViews = new Router();

routerViews.get('/realtimeproducts', async (req, res) => {
	let viewAllProd = await myViews.getProduct();
	console.log(viewAllProd);
	res.render('realTimeProducts', {
		products: viewAllProd,
	})
})

export default routerViews;