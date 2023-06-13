// importo dependencias
import express from 'express';
import { server, app } from './utils/socket.js';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';

// importo rutas fs [solo habilitar si las rutas de mongodb están comentadas]
// import productsRoutes from './routes/fs.routes/productsRoutes.js';
// import cartsRoutes from './routes/fs.routes/cartsRoutes.js';
// import viewsRoutes from './routes/fs.routes/viewsRoutes.js';

// importo rutas mongodb
import productsRouter from './routes/mongo.routes/products.routes.js';
import cartsRouter from './routes/mongo.routes/carts.routes.js';
import messagesRouter from './routes/mongo.routes/messages.routes.js';
import viewsRouter from './routes/mongo.routes/views.routes.js';

// seteo middlewares obligatorios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// configuro handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', 'views/');
app.set('view engine', 'handlebars');

// seteo la carpeta public como estática
app.use(express.static('public/'));

// rutas fs [solo habilitar si las rutas de mongodb están comentadas]
//app.use('/api/products', productsRoutes);
//app.use('/api/carts', cartsRoutes);
//app.use('/', viewsRoutes);

// rutas mongodb
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/chat', messagesRouter);
app.use('/', viewsRouter);

const mongoDb =
	'mongodb+srv://ecommerce:UPSPro802@ecommerce.hebknry.mongodb.net/ecommerce';
await mongoose.connect(mongoDb);

// inicializo servidor
const port = 8080;
server.listen(port, () => console.log(`Server Listening on port ${port}...`));
