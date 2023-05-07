// Importo express
import express from 'express';

// Importo rutas
import productsRoutes from './routes/productsRouter.js';
import cartsRoutes from './routes/cartsRoutes.js';

const app = express();
const port = 8080;

// Empleo dos middlewares para interpretar mensajes de tipo JSON en formato urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Utilizo las rutas
app.use('/api/products', productsRoutes);
app.use('/api/carts', cartsRoutes);

// Inicializo el servidor
app.listen(port, () => {
	console.log(`Listen Port ${port}`);
});
