import { Router } from 'express'
import ProductSchema from '../Dao/db/manager/prodMongoManager.js';

const Product = new ProductSchema();
const routerProd = new Router();

routerProd.get('/', async (req, res) => {
	try {
		const { query } = req.query;
		const limit = parseInt(req.query.limit, 10) || 10;
		const page = parseInt(req.query.page, 10) || 1;
		const available = parseInt(req.query.available, 10);
		const sort = parseInt(req.query.sort, 10);

		let myProd = await Product.getProduct( limit, page, query, available, sort );
		res.send(myProd)
	} catch (error) {
		console.log(error);
	}
})

routerProd.get('/:pid', async (req, res) => {
	try {
		const { pid } = req.params
		let myProdFind = await Product.getProductById(pid);
		res.send(myProdFind)
	} catch (error) {
		console.log(error)
	}
})

routerProd.post('/', async (req, res) => {
	try {
		const prodAdd = await Product.addProduct(req.body)
		res.send(prodAdd)
	} catch (error) {
		console.log(error)
	}
})

routerProd.post('/many', async ( req, res ) => {
	try {
		const all = await Product.addManyProducts( req.body )
		res.send(all)
	} catch (error) {
		console.log(error)
	}
})

routerProd.put('/:id', async (req, res) => {
	try {
		const { id } = req.params
		const prodAdd = await Product.updateProductById(id, req.body)
		res.send(prodAdd)
	} catch (error) {
		console.log(error)
	}
})

routerProd.delete('/:id', async (req, res) => {
	try {
		const { id } = req.params
		const remove = Product.deleteOneById(id)
		res.send(remove)
	} catch (error) {
		console.log(error)
	}
})

export default routerProd;