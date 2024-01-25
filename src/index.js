import express from 'express';
import handlebars from 'express-handlebars';
import { createServer } from 'http'; // <-- Modulo nativo de node.js para crear servidores con el protocolo http
import { Server } from 'socket.io';
import __dirname from './utils.js';
import ProductManager from './controllers/productsManager.js';
const myProducts = new ProductManager();

import routerProd from './routes/products.routes.js';
import routerCart from './routes/carts.routes.js';
import routerViews from './routes/views.routes.js'

const app = express();
const server = createServer(app); // <-- Creando un servidor http con express de argumento necesario para socket.io
const io = new Server(server);
const PORT = 8080;

app.use(express.urlencoded({ extended: true })); // <-- Permite manejar a express url complejas
app.use(express.static(__dirname + '/public')); // <-- Archivos estáticos de la carpeta public
app.use(express.json()); // <-- Para que express pueda leer los archivos JSON

// Configurando handlebars
app.engine('handlebars', handlebars.engine()); // <-- Inicializando el motor de handlebars
app.set('view engine', 'handlebars'); // <-- Para que el motor lea todos los archivos de la carpeta views
app.set('views', __dirname + '/views'); // <-- Indicando la dirección de la carpeta views

app.get('/', async (req, res) => {
	let allProducts = await myProducts.getProduct();
	res.render('home', {
		title: 'Express | Handlebars',
		products: allProducts
	});
});

io.on('connection', (socket) => {
	socket.on('productos', (data) => {
		console.log(data);
	});
});

app.use('/api/products', routerProd);
app.use('/api/carts', routerCart);
app.use('/api/views', routerViews);

server.listen(PORT, () => console.log(`Serve OK - ${PORT}`));