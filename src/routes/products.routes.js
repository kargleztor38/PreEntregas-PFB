import { Router } from 'express'
import ProductSchema from '../Dao/db/manager/prodMongoManager.js';

const Product = new ProductSchema();
const routerProd = new Router();

routerProd.get('/', async (req, res) => {
	try {
		const { limit = 5, page = 1, sort, query } = req.query;
		
		let myProd = await Product.getProduct( limit, page, query, sort );
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