// importo dependencias
import express from 'express';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
// importo rutas
import cartsRoutes from './routers/cartsRoutes.js';
import productsRoutes from './routers/productsRoutes.js';
import viewsRoutes from './routers/viewsRoutes.js';

// inicializo express
const app = express();

// seteo middlewares obligatorios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// configuro handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', 'views/');
app.set('view engine', 'handlebars');

// seteo la carpeta public como estática
app.use(express.static('public/'));

// seteo rutas
app.use('/', viewsRoutes);
app.use('/api/carts', cartsRoutes);
app.use('/api/products', productsRoutes);

// inicializo servidores
const port = 8080;
const serverExpress = app.listen(port, () =>
	console.log('Server Express Listening...')
);
const io = new Server(serverExpress);

io.on('connection', (socket) => {
	console.log('Cliente conectado...');
	//socket.emit('product_list', 'productList');
});
