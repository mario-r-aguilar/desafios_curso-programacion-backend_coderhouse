import { Router } from 'express';

const viewsRoutes = Router();

viewsRoutes.get('/', (req, res) => {
	res.render('home', {});
});

viewsRoutes.get('/realtimeproducts', (req, res) => {
	res.render('realTimeProducts', {});
});

export default viewsRoutes;
