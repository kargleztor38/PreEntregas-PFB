import ProductManager from "../controllers/productsManager.js";
const manager = new ProductManager()

const socketProd = ( socketServer ) => {
	socketServer.on('connection', async (socket) => {
		console.log('conectado');
		const allProducts = await manager.getProduct();
		socket.emit('sendProduct', allProducts)
		
		socket.on('addProduct', async (data) => {
			await manager.addProduct(data);
			const allProducts = await manager.getProduct();
			socket.emit('sendProduct', allProducts)
		})
		socket.on('deleteP', async (id) => {
			await manager.deleteProductById(id);
			const allProducts = await manager.getProduct();
			socket.emit('sendProduct', allProducts)
		})
	});
};

export default socketProd;