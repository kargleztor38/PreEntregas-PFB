import mongoose from "mongoose";

export default {
	connect: async () => {
		return mongoose.connect('mongodb+srv://karlay39:1984cagt@coderproject.4hgrqq7.mongodb.net/ecommerce')
		.then(() => console.log('Database connected'))
		.catch((error) => console.log(error))
	}
};