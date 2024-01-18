const { Router } = require('express')
const ProductManager = require('../productsManager')
const myProducts = new ProductManager()

const router = new Router() 

router.get('/', async (req, res) => {
	const { limit } = req.query
	let myProd = await myProducts.getProduct()
	const arrSection = myProd.slice(0, limit)
	res.send(limit < 0 || limit > 4 || limit == '' ? myProd : arrSection)
})

router.get('/:pid', async (req, res) => {
	const { pid } = req.params
	let myProdFind = await myProducts.getProductById(pid);
	res.send(myProdFind)
})

router.post('/', async (req, res) => {
	const { title, description, img, code, stock, price, category, status = true } = req.body
	const prodAdd = await myProducts.addProduct(title, description, img, code, stock, price, category, status)
	res.send(prodAdd)
})

router.put('/:id', async (req, res) => {
	const { id } = req.params
	const { title, description, img, code, stock, price, category, status = true } = req.body
	const prodAdd = await myProducts.updateProductById(id, { title, description, img, code, stock, price, category, status })
	return prodAdd
})

router.delete('/:id', async (req, res) => {
	const { id } = req.params
	const removedProd = myProducts.deleteProductById(id)
	res.send(removedProd)
})

module.exports = router