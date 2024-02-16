import messagesManager from "../Dao/db/manager/msgMongoManager.js";
const messageMg = new messagesManager();

const socketChat = (serverChat) => {
	serverChat.on('connection', async (socket) => {
		console.log('Server chat connected')

		socket.on('mensaje', async (info) => {
			await messageMg.createMessage(info);
			const all = await messageMg.getMessages();
			serverChat.emit('chat', all);
		})

		socket.on('removeChat', async () => {
			await messageMg.deleteMessages()
		})

		socket.on('nuevoUsuario', usuario => {
			socket.emit('forAll', usuario)
		})
	})
}

export default socketChat;