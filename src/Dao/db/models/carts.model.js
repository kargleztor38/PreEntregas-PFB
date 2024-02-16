import mongoose from 'mongoose';
const { Schema } = mongoose;

const cartsModel = new Schema({
	name: {
		type: String,
		required: true
	},
	product: {
		type: [
			{ 
				quantity: { 
					type: Number,
					default: 1
				}
			}
		]
	}
})

const collCarts = mongoose.model('carts', cartsModel);
export default collCarts;