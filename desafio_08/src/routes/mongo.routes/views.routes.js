import { Router } from 'express';
import { productsService } from '../../dao/mongodb.services/products.service.js';
import { isAuth, isGuest } from '../../middlewares/auth.middleware.js';
//import { messagesService } from '../../dao/mongodb.services/messages.service.js';

const viewsRouter = Router();

viewsRouter.get('/', isAuth, async (req, res) => {
	try {
		const { user } = req.session;
		delete user.password;
		const productsMdb = await productsService.getProducts();
		res.render('home', { productsMdb: productsMdb, user: user });
	} catch (err) {
		res.status(500).send({ err });
	}
});

viewsRouter.get('/register', isGuest, (req, res) => {
	res.render('register', {
		title: 'Registrarse',
	});
});

viewsRouter.get('/login', isGuest, (req, res) => {
	res.render('login', {
		title: 'Inicio de Sesión',
	});
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

viewsRouter.get('/chat', (req, res) => {
	res.render('chat');
});

// viewsRouter.get('/chat', async (req, res) => {
// 	const messages = await messagesService.getAllMessages();
// 	try {
// 		res.render('chat', {
// 			title: 'Chat',
// 			messages: messages,
// 		});
// 	} catch (err) {
// 		res.status(500).send({ err });
// 	}
// });

export default viewsRouter;
