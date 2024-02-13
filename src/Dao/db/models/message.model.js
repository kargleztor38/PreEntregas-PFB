import mongoose from "mongoose";

const msg = new mongoose.Schema({ 
	user: String,
	message: String
})

const msgModel = mongoose.model('messages', msg)
export default msgModel;