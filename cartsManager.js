const fs = require('fs/promises')
const uuid4 = require('uuid4')

class CartManager {
	constructor() {
		this.path = 'cart.json'
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

		if (cart) {
			return cart.products
		} else {
			return 'El carrito que busca no existe'
		}
	}

	newCart = async () => {
		const id = uuid4()
		const newCart = { id, products: [] }

		this.carts = await this.getCart()
		this.carts.push(newCart)
		await fs.writeFile(this.path, JSON.stringify(this.carts))
		return newCart
	}

	addProductCart = async (cartId, productId) => {
		const carts = await this.getCart()
		const cartFound = carts.find(cart => cart.id == cartId)


	}
}
const cartM = new CartManager()

module.exports = CartManager