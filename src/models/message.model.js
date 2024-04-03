import mongoose from "mongoose";
const { Schema } = mongoose;

const msg = new Schema({ 
	user: String,
	message: String
})

const msgModel = mongoose.model('messages', msg)
export default msgModel;