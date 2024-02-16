import collCarts from "../models/carts.model.js";

class handleCart {
	getCarts = async () => {
		try {
			const allCarts = await collCarts.find()
			return allCarts;
		} catch (error) {
			console.log(error)
		}
	}

	getCartById = async ( id ) => {
		try {
			const carts = await collCarts.findById( id )
			return carts;
		} catch (error) {
			return error
		}
	}

	createNewCart = async (prod) => {
		try {
			await collCarts.create(prod)
		} catch (error) {
			return error
		}
	}

	addProductCart = async ( idc, newProducto ) => {
		try {
			await collCarts.findByIdAndUpdate( idc, { $push: { product: newProducto } }, { new: true } )
		} catch (error) {
			console.log(error)
		}
	}

	deleteCartById = async ( id ) => {
		try {
			await collCarts.findByIdAndDelete( id )
		} catch (error) {
			console.log(error);
		}
	}
}

export default handleCart;