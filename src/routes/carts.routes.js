import { Router } from 'express'
import handleCart from '../Dao/db/manager/cartsMongoManager.js';

const carts = new handleCart();
const routerCart = new Router()

routerCart.get('/', async (req, res) => {
	try {
		const allCarts = await carts.getCarts();
		res.send(allCarts)
	} catch (error) {
		console.log(error)
	}
})

routerCart.get('/:id', async ( req,res ) => {
	try {
		const { id } = req.params;
		const cartFind = await carts.getCartById( id )
		res.send(cartFind)
	} catch (error) {
		res.send('Error al eliminar el producto', error)
	}
})

routerCart.post('/', async ( req, res ) => {
	try {
		const product = req.body
		await carts.createNewCart(product)
		res.send('Producto agregado correctamente')
	} catch (error) {
		res.send(error);
	}
})

routerCart.put('/:id', async ( req, res ) => {
	try {
		const { id } = req.params;
		await carts.addProductCart(id, req.body)
		res.send('Producto agregado')
	} catch (error) {
		console.log(error);
	}
})

routerCart.delete('/:id', async ( req, res ) => {
	try {
		const { id } = req.params
		await carts.deleteCartById( id )
		res.send('Producto eliminado')
	} catch (error) {
		console.log(error)
	}
})


export default routerCart;