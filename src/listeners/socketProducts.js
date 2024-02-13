import productsDb from "../Dao/db/manager/prodMongoManager.js";
const mdb = new productsDb()

const socketProd = (socketServer) => {
	socketServer.on('connection', async (socket) => {
		console.log('Products connected');
		const allProducts = await mdb.getProduct();
		socket.emit('sendProducts', allProducts)

		socket.on('addProduct', async (data) => {
			await mdb.addProduct(data);
			const allProducts = await mdb.getProduct();
			socket.emit('sendProducts', allProducts)
		})

		socket.on('deleteP', async (id) => {
			await mdb.deleteOneById(id);
			const allProducts = await mdb.getProduct();
			socket.emit('sendProducts', allProducts);
		})
	});
};

export default socketProd;