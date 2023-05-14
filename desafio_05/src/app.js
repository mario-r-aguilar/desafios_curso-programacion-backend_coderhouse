// importamos dependencias
import express from 'express';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
// importamos rutas
import cartsRoutes from './routers/cartsRoutes.js';
import productsRoutes from './routers/productsRoutes.js';
import viewsRoutes from './routers/viewsRoutes.js';

// inicializamos express
const app = express();

// instanciamos middlewares obligatorios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// configuramos handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', 'views/');
app.set('view engine', 'handlebars');

// seteamos la carpeta public como estática
app.use(express.static('public/'));

// seteamos rutas
app.use('/', viewsRoutes);
app.use('/api/carts', cartsRoutes);
app.use('/api/products', productsRoutes);

// inicializamos servidores
const port = 8080;
const serverExpress = app.listen(port, () =>
	console.log('Server Express Listening...')
);
const io = new Server(serverExpress);
io.on('conection', (socket) => {
	console.log('Websocket Listening...');
});
