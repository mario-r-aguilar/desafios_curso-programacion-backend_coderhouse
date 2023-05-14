import { Router } from 'express';
import { listOfProducts } from '../utils/instances.js';

const viewsRoutes = Router();

viewsRoutes.get('/', async (req, res) => {
	const productsList = await listOfProducts.getProducts();
	res.render('home', { tittle: 'Lista de Productos', products: productsList });
});

viewsRoutes.get('/realtimeproducts', async (req, res) => {
	const productsList = await listOfProducts.getProducts();
	res.render('realTimeProducts', {
		tittle: 'Productos en tiempo real',
		products: productsList,
	});
});

export default viewsRoutes;
