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
				},
				quantity: {
					type: Number,
					default: 1
				}
			}
		],
		default: []
	}
})

const Carts = mongoose.model('carts', cartsModel);
export default Carts;