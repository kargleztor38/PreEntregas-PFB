import Carts from "../models/carts.model.js";

class handleCart {
	getCarts = async () => {
		try {
			const allCarts = await Carts.find()
			return allCarts;
		} catch (err) {
			console.log(err)
		}
	}

	getCartById = async ( id ) => {
		try {
			const carts = await Carts.findById(id).lean()
			return carts;
		} catch (err) {
			return err
		}
	}

	createNewCart = async (prod) => {
		try {
			await Carts.create(prod)
		} catch (err) {
			return err
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
		} catch (err) {
			console.log(err)
		}
	}

	addProductCart = async ( idc, idp ) => {
		try {
			const validate = await Carts.findById(idc).populate('products.product')
			const findIndex = validate.products.findIndex(prod => prod.product._id == idp)
			
			if ( findIndex !== -1 ) {
				const sum = validate.products[findIndex].quantity + 1
				validate.products[findIndex].quantity = sum
				await validate.save()
				return 'Se aumento la cantidad del producto en 1'
			} else {
				const res1 = await Carts.findOne({ _id: idc })
				res1.products.push({ product: idp })
				await Carts.updateOne({ _id: idc }, res1)
				return 'Producto agregado'
			}
		} catch (err) {
			console.log(err)
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
		} catch (err) {
			console.log(err)
		}
	}

	deleteOneProduct = async ( cid, pid ) => {
		const update = { products: { product: pid } }
		try {
			const carrito = await Carts.findOneAndUpdate(
				{ _id: cid },
				{ $pull: update },
			).exists( update )

			return carrito
		} catch (err) {
			console.log(err);
		}
	}

	delelteAllProducts = async ( cid ) => {
		const query = { _id: cid }
		const update = { $set: { products: [] } }
		try {
			const up = await Carts.findByIdAndUpdate(
				query,
				update
			)
			return up ? true : false
		} catch (err) {
			console.log(err)
		}
	}
}

export default handleCart;