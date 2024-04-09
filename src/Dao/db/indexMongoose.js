import mongoose from "mongoose";

export default {
	connect: async () => {
		return mongoose.connect(process.env.URL_MONGO_CONNECT)
		.then(() => console.log('Database connected'))
		.catch((error) => console.log(error))
	}
}