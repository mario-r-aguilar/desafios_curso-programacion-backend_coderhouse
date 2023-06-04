// importo dependencias
import express from 'express';
import { server, app } from './utils/socket.js';
import handlebars from 'express-handlebars';

// importo rutas
import cartsRoutes from './routes/cartsRoutes.js';
import productsRoutes from './routes/productsRoutes.js';
import viewsRoutes from './routes/viewsRoutes.js';

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

// inicializo servidor
const port = 8080;
server.listen(port, () => console.log(`Server Listening on port ${port}...`));
