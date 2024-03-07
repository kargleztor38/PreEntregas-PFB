import mongoose from "mongoose";
import mongoPaginate from 'mongoose-paginate-v2'

const { Schema } = mongoose;

const prodSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
    description: {
		type: String,
		required: true
	},
    img: {
		type: String,
		required: true
	},
    code: {
		type: String,
		required: true,
		unique: true
	},
    stock: {
		type: Number,
		default: 10
	},
    price: {
		type: Number,
		required: true,
	},
    category: {
		type: String,
		required: true,
		enum: ['Música', 'Electrodomésticos', 'Tecnología', 'Calzado']
	},
    status: {
		type: Boolean,
		default: true
	}
});

prodSchema.plugin( mongoPaginate )

const ProductSchema = new mongoose.model('products', prodSchema);

export default ProductSchema;