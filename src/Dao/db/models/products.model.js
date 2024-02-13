import mongoose from "mongoose";

const prodSchema = new mongoose.Schema({
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
		enum: ['Música', 'Electrodoméstico', 'Tecnología', 'Calzados']
	},
    status: {
		type: Boolean,
		default: true
	}
});

const modelPro = new mongoose.model('products', prodSchema);

export default modelPro;