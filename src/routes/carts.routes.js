import { Router } from 'express'
import handleCart from '../Dao/db/manager/cartsMongoManager.js';

const carts = new handleCart();
const routerCart = new Router()

// OBTENER TODOS LOS CARRITOS
routerCart.get('/', async (req, res) => {
	try {
		const allCarts = await carts.getCarts();
		res.send(allCarts)
	} catch (error) {
		console.log(error)
	}
})

// OBTENER CARRITOS POR EL ID
routerCart.get('/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const cartFind = await carts.getCartById(id)
		res.send(cartFind)
	} catch (error) {
		res.send('Error al eliminar el producto', error)
	}
})

// CREAR UN NUEVO CARRITO
routerCart.post('/', async (req, res) => {
	try {
		const product = req.body
		await carts.createNewCart(product)
		res.send('Producto agregado correctamente')
	} catch (error) {
		res.send(error);
	}
})

// AGREGAR PRODUCTOS AL CARRITO
routerCart.post('/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const { idp } = req.query;

		const resp = await carts.addProductCart(id, idp)
		console.log(resp);
		res.send(resp)
	} catch (error) {
		console.log(error);
	}
})

// ACTUALIZAR LA PROPIEDAD QUANTITY DE LOS PRODUCTOS DEL CARRITO SELECCIONADO
routerCart.put('/:cid/product/:pid', async (req, res) => {
	try {
		const { cid, pid } = req.params
		const { quantity } = req.body

		const updatQuantity = await carts.updateQtyProdCart(cid, quantity, pid);
		updatQuantity === true ? res.status(200).send('Producto actualizado') : res.status(404).send('Producto no encontrado');

	} catch (error) {
		console.log(error)
	}
})

// ACTUALIZAR CON UN ARRAY DE PRODUCTOS EL CARRITO
routerCart.put('/:cid', async (req, res) => {
	try {
		const { cid } = req.params
		const arrayP = req.body

		const update = await carts.updateMenyProductsCart(cid, arrayP)
		if (update === true) {
			res.status(200).send('Array de productos actualizados')
		} else {
			res.status(404).send(update)
		}
	} catch (error) {
		res.status(500).send('Error en el servidor')
	}
})

// ELIMINAR UN PRODUCTO DEL CARRITO
routerCart.delete('/:cid/product/:pid', async (req, res) => {
	try {
		const { cid, pid } = req.params
		const resp = await carts.deleteProductCart(cid, pid)

		if (resp._id) {
			res.status(200).send('Producto eliminado del carrito')
		} else {
			res.status(404).send('Producto no encontrado')
		}
	} catch (error) {
		res.status(500).send('Problemas al realizar la operacion')
	}
})

// ELIMINAR TODOS LOS PRODUCTOS DEL ARRAY
routerCart.delete('/:cid', async (req, res) => {
	try {
		const { cid } = req.params
		const remove = await carts.delelteProductsCart( cid )

		res.send(remove)
	} catch (error) {
		return res.status(500).send('Problemas con el servidor', error)
	}
})
export default routerCart;