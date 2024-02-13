import msgModel from "../models/message.model.js";

class messagesManager {
	getMessages = async () => {
		try {
			return await msgModel.find().lean();
		} catch (error) {
			return error
		}
	}

	createMessage = async (message) => {
		if (message.user.trim() === '' || message.message.trim() === '') {
			return null;
		}
		try {
			return await msgModel.create(message);
		} catch (error) {
			return error
		}
	}

	deleteMessages = async () => {
		try {
			const resp = await msgModel.deleteMany({})
			console.log('Mensajes borrados:', resp)
			return resp
		} catch (error) {
			return error
		}
	}
}

export default messagesManager;