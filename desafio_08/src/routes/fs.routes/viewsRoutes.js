import { Router } from 'express';
import { listOfProducts } from '../../utils/instances.js';

const viewsRoutes = Router();

viewsRoutes.get('/', async (req, res) => {
	const productsList = await listOfProducts.getProducts();
	res.render('home', { title: 'Lista de Productos', products: productsList });
});

viewsRoutes.get('/realtimeproducts', async (req, res) => {
	res.render('realTimeProducts', {
		title: 'Productos en tiempo real',
	});
});

export default viewsRoutes;
