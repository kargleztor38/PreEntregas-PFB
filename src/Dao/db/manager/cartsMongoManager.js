import Carts from "../models/carts.model.js";

class handleCart {
	getCarts = async () => {
		try {
			const allCarts = await Carts.find().populate('products.product')
			return allCarts;
		} catch (error) {
			console.log(error)
		}
	}

	getCartById = async ( id ) => {
		try {
			const carts = await Carts.findOne({ _id: id }).populate('products.product')
			return carts;
		} catch (error) {
			return error
		}
	}

	createNewCart = async (prod) => {
		try {
			await Carts.create(prod)
		} catch (error) {
			return error
		}
	}

	addProductCart = async ( idc, idp ) => {
		try {
			const respCart = await Carts.findOne({ _id: idc })
			respCart.products.push({ product: idp })
			await Carts.updateOne( { _id: idc }, respCart )
			
			const resp = await this.getCartById({ _id: idc })
			return resp
		} catch (error) {
			console.log(error)
		}
	}

	updateQtyProdCart = async ( cid, quantity, pid ) => {
		try {
			const res = await Carts.findById(cid).populate('products.product')
			const findIndex = res.products.findIndex(prod => prod.product._id == pid)

			if (findIndex !== -1) {
				const sum = res.products[findIndex].quantity + quantity
				res.products[findIndex].quantity = sum
				await res.save()
				return true
			} else {
				return false
			}
		} catch (error) {
			console.log(error)
		}
	}

	updateMenyProductsCart = async ( cid, arrayP ) => {
		try {
			const cart = await Carts.findById(cid)
			if (!cart) {
				return 'Carrito no encontrado'
			} else {
				cart.products = arrayP
				await cart.save()
				return true
			}
		} catch (error) {
			console.log(error)
		}
	}

	deleteProductCart = async ( cid, pid ) => {
		try {
			const getCart = await Carts.findById( cid )
			const exist = getCart.products.findIndex(pord => pord.product._id == pid)

			if ( exist !== -1 ) {
				const carrito = await Carts.findOneAndUpdate(
					{ _id: cid },
					{ $pull: { products: { product: pid } } },
					{ next: true }
				)
				return carrito
			} else {
				return 'Producto no encontrado'
			}
		} catch (error) {
			console.log(error);
		}
	}

	delelteProductsCart = async ( cid ) => {
		const query = { _id: cid }
		const update = { $set: { products: [] } }
		const options = { new: true }
		try {
			const up = await Carts.findByIdAndUpdate(
				query,
				update, 
				options
			)
			return up
		} catch (error) {
			console.log(error)
		}
	}
}


export default handleCart;