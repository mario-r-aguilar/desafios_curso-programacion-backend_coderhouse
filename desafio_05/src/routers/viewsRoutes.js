import { Router } from 'express';
import { listOfProducts } from '../utils/instances.js';

const viewsRoutes = Router();

viewsRoutes.get('/', (req, res) => {
	const productsList = listOfProducts.getProducts();
	res.render('home', { tittle: 'Lista de Productos', products: productsList });
});

viewsRoutes.get('/realtimeproducts', (req, res) => {
	res.render('realTimeProducts', { tittle: 'Productos en tiempo real' });
});

export default viewsRoutes;
