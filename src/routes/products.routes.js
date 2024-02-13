import { Router } from 'express'
import productsDb from '../Dao/db/manager/prodMongoManager.js';

const Pdb = new productsDb();
const routerProd = new Router();

routerProd.get('/', async (req, res) => {
	try {
		const { limit } = req.query
		let myProd = await Pdb.getProduct(limit);
		res.send(myProd)
	} catch (error) {
		console.log(error);
	}
})

routerProd.get('/:pid', async (req, res) => {
	try {
		const { pid } = req.params
		let myProdFind = await Pdb.getProductById(pid);
		res.send(myProdFind)
	} catch (error) {
		console.log(error)
	}
})

routerProd.post('/', async (req, res) => {
	try {
		const prodAdd = await Pdb.addProduct(req.body)
		res.send(prodAdd)
	} catch (error) {
		console.log(error)
	}
})

routerProd.put('/:id', async (req, res) => {
	try {
		const { id } = req.params
		const prodAdd = await Pdb.updateProductById(id, req.body)
		res.send(prodAdd)
	} catch (error) {
		console.log(error)
	}
	
})

routerProd.delete('/:id', async (req, res) => {
	try {
		const { id } = req.params
		const remove = Pdb.deleteOneById(id)
		res.send(remove)
	} catch (error) {
		console.log(error)
	}
})

export default routerProd;