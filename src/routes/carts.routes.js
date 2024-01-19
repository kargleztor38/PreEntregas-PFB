const { Router } = require('express')
const CartManager = require('../controllers/cartsManager')

const routerCart = new Router()
const myCarts = new CartManager()

routerCart.post('/', async (req, res) => {
	const routerCartNew = await myCarts.createNewCart()
	res.send(routerCartNew ? routerCartNew : 'Error al crear el carrito')
})

routerCart.get('/:cid', async (req, res) => {
	const { cid } = req.params
	const routerProductCart = await myCarts.getCartProducts(cid)
	res.send(routerProductCart ? routerProductCart : 'Productos no encontrados')
})

routerCart.post('/:cid/products/:pid', async (req, res) => {
	const { cid, pid } = req.params
	await myCarts.addProductCart( cid, pid )
	res.send('Producto agregado correctamente')
})

module.exports = routerCart