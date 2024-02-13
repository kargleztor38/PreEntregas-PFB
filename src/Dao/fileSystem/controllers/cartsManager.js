import { promises as fs } from 'fs';
import uuid4 from 'uuid4';

class CartManager {
	constructor() {
		this.path = './src/models/cart.json'
		this.carts = []
	}

	getCart = async () => {
		const resp1 = await fs.readFile(this.path, 'utf-8')
		const resp1JSON = JSON.parse(resp1)
		return resp1JSON
	}

	getCartProducts = async ( id ) => {
		const carts = await this.getCart()
		const cart = carts.find( cart => cart.id == id )
		return cart ? cart.products : 'El carrito que busca no existe'
	}

	createNewCart = async () => {
		const id = uuid4()
		const newCart = { id, products: [] }

		this.carts = await this.getCart()
		this.carts.push(newCart)
		await fs.writeFile(this.path, JSON.stringify(this.carts, null, 2))
		return newCart
	}

	addProductCart = async (idC, idCP) => {
		const cartsList = await this.getCart()
		const cartFound = cartsList.findIndex(cart => cart.id == idC)

		if (cartFound !== -1) {
			const prodCart = await this.getCartProducts(idC)
			const productIndexCart = prodCart.findIndex(prod => prod.idCP == idCP)

			if (productIndexCart !== -1) {
				prodCart[productIndexCart].quantity = prodCart[productIndexCart].quantity + 1
			} else {
				prodCart.push({ idCP, quantity: 1 })
			}
			cartsList[cartFound].products = prodCart
			await fs.writeFile(this.path, JSON.stringify(cartsList, null, 2))
		} else {
			return 'Carrito no encontrado'
		}
	}
}

export default CartManager;