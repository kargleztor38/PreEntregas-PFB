import cartsModel from "../models/carts.model.js";

class handleCart {
	getCarts = async () => {
		try {
			const allCarts = await cartsModel.find()
			return allCarts;
		} catch (error) {
			console.log(error)
		}
	}

	getCartById = async ( id ) => {
		try {
			const carts = await cartsModel.findOne({ _id: id })
			return carts;
		} catch (error) {
			return error
		}
	}

	createNewCart = async (prod) => {
		try {
			await cartsModel.create(prod)
		} catch (error) {
			return error
		}
	}

	addProductCart = async ( idc, ref ) => {
		try {
			const respCart = await cartsModel.findOne({ _id: idc })
			respCart.products.push({ product: ref })
			await cartsModel.updateOne( { _id: idc }, respCart )
			
			const resp = await this.getCartById({ _id: idc })
			return resp
		} catch (error) {
			console.log(error)
		}
	}

	deleteCartById = async ( id, producId ) => {
		try {
			await cartsModel.findByIdAndDelete( id )
		} catch (error) {
			console.log(error);
		}
	}
}

export default handleCart;