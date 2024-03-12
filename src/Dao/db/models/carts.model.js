import mongoose from 'mongoose';
const { Schema } = mongoose;

const cartsModel = new Schema({
	user: {
		type: String,
		required: true
	},
	products: {
		type: [
			{
				product: {
					type: Schema.Types.ObjectId,
					ref: 'products'
				}
			}
		],
		default: []
	}
})

const collCarts = mongoose.model('carts', cartsModel);
export default collCarts;