// importo dependencias
import express from 'express';
import { server, app } from './utils/socket.js';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';

// rutas fs [solo habilitar si las rutas de mongodb están comentadas]
// import productsRoutes from './routes/fs.routes/productsRoutes.js';
// import cartsRoutes from './routes/fs.routes/cartsRoutes.js';
// import viewsRoutes from './routes/fs.routes/viewsRoutes.js';

// rutas mongodb
import productsRouter from './routes/mongo.routes/products.routes.js';
import cartsRouter from './routes/mongo.routes/carts.routes.js';
import userRouter from './routes/mongo.routes/users.routes.js';
import viewsRouter from './routes/mongo.routes/views.routes.js';
import messagesRouter from './routes/mongo.routes/messages.routes.js';

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

app.use(cookieParser('Fre3%FoRriCe!'));

app.use(
	session({
		store: MongoStore.create({
			mongoUrl:
				'mongodb+srv://ecommerce:UPSPro802@ecommerce.hebknry.mongodb.net/ecommerce',
			mongoOptions: {
				useNewUrlParser: true,
			},
			ttl: 3000,
		}),
		secret: 'Fre3%FoRriCe!',
		resave: true,
		saveUninitialized: true,
	})
);

// rutas mongodb
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/users', userRouter);
app.use('/', viewsRouter);
app.use('/api/chat', messagesRouter);

const mongoDb =
	'mongodb+srv://ecommerce:UPSPro802@ecommerce.hebknry.mongodb.net/ecommerce';
await mongoose.connect(mongoDb);

// inicializo servidor
const port = 8080;
server.listen(port, () => console.log(`Server Listening on port ${port}...`));
