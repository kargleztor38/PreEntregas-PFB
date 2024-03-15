import { Router } from 'express'
import handleCart from '../Dao/db/manager/cartsMongoManager.js';

const carts = new handleCart();
const routerCart = new Router()

// OBTENER TODOS LOS CARRITOS
routerCart.get('/', async (req, res) => {
	try {
		const allCarts = await carts.getCarts();
		res.send(allCarts)
	} catch (err) {
		console.log(err)
	}
})

// OBTENER CARRITOS POR EL ID
routerCart.get('/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const cartFind = await carts.getCartById(id)
		res.send(cartFind)
	} catch (err) {
		res.send('Error al eliminar el producto', err)
	}
})

// CREAR UN NUEVO CARRITO
routerCart.post('/', async (req, res) => {
	try {
		const product = req.body
		await carts.createNewCart(product)
		res.send('Producto agregado correctamente')
	} catch (err) {
		res.send(err);
	}
})

// AGREGAR PRODUCTOS AL CARRITO
routerCart.post('/:idc', async (req, res) => {
	try {
		const { idc } = req.params;
		const { idp } = req.query;

		const resp = await carts.addProductCart(idc, idp)
		
		res.send(resp)
	} catch (err) {
		console.log(err);
	}
})

// ACTUALIZAR LA PROPIEDAD QUANTITY DE LOS PRODUCTOS DEL CARRITO SELECCIONADO
routerCart.put('/:cid/product/:pid', async (req, res) => {
	try {
		const { cid, pid } = req.params
		const { quantity } = req.body

		const updatQuantity = await carts.updateQtyProdCart(cid, quantity, pid);
		updatQuantity === true ? res.status(200).send('Producto actualizado') : res.status(404).send('Producto no encontrado');

	} catch (err) {
		console.log(err)
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
	} catch (err) {
		res.status(500).send('Error en el servidor')
	}
})

// ELIMINAR UN PRODUCTO DEL CARRITO
routerCart.delete('/:cid/product/:pid', async (req, res) => {
	try {
		const { cid, pid } = req.params
		const resp = await carts.deleteOneProduct(cid, pid)
		if (resp !== null) {
			res.status(200).send('Producto eliminado del carrito')
		} else {
			res.status(404).send('Producto no encontrado')
		}
	} catch (err) {
		res.status(500).send('Problemas al realizar la operacion: ' + err)
	}
})

// ELIMINAR TODOS LOS PRODUCTOS DEL ARRAY
routerCart.delete('/:cid', async (req, res) => {
	try {
		const { cid } = req.params
		const remove = await carts.delelteAllProducts( cid )
		if (remove === true) {
			res.status(200).send('El carrito se a vaceado')
		} else {
			res.status(404).send('Carrito no encontrado')
		}
	} catch (err) {
		return res.status(500).send('Problemas con el servidor: ' + err)
	}
})
export default routerCart;