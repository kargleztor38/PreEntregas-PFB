import { Router } from 'express'
import ProductManager from '../controllers/productsManager.js'
const myProducts = new ProductManager()

const routerProd = new Router() 

routerProd.get('/', async (req, res) => {
	const { limit } = req.query
	let myProd = await myProducts.getProduct()
	const arrSection = myProd.slice(0, limit)
	res.send(limit < 0 || limit > 4 || limit == '' ? myProd : arrSection)
})

routerProd.get('/:pid', async (req, res) => {
	const { pid } = req.params
	let myProdFind = await myProducts.getProductById(pid);
	res.send(myProdFind)
})

routerProd.post('/', async (req, res) => {
	const prodAdd = await myProducts.addProduct(req.body)
	res.send(prodAdd)
})

routerProd.put('/:id', async (req, res) => {
	const prodAdd = await myProducts.updateProductById(req.params, req.body)
	res.send(prodAdd)
})

routerProd.delete('/:id', async (req, res) => {
	const { id } = req.params
	myProducts.deleteProductById(id)
	res.send('Producto eliminado')
})

export default routerProd;