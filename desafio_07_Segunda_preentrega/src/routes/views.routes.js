import { Router } from 'express';
import { productsService } from '../dao/products.service.js';
import { messagesService } from '../dao/messages.service.js';

const viewsRouter = Router();

viewsRouter.get('/', async (req, res) => {
	try {
		const { limit, page, sort, category, status } = req.query;
		const productsMdb = await productsService.getAllProductsMdb(
			limit,
			page,
			sort,
			category,
			status
		);

		res.render('home', productsMdb);
	} catch (err) {
		res.status(500).send({ err });
	}
});

viewsRouter.get('/realtimeproducts', async (req, res) => {
	try {
		res.render('realTimeProducts', {
			title: 'Productos en tiempo real',
		});
	} catch (err) {
		res.status(500).send({ err });
	}
});

viewsRouter.get('/chat', async (req, res) => {
	const messages = await messagesService.getAllMessages();
	try {
		res.render('chat', {
			title: 'Chat',
			messages: messages,
		});
	} catch (err) {
		res.status(500).send({ err });
	}
});

export default viewsRouter;
