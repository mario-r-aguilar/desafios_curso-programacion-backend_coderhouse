import { Router } from 'express';
import { cartsService } from '../dao/carts.service.js';

const cartsRouter = Router();

cartsRouter.get('/', async (req, res) => {
	try {
		const cart = await cartsService.getCartsAll();
		res.send(cart);
	} catch (err) {
		res.status(500).send({ err });
	}
});

cartsRouter.get('/:cid', async (req, res) => {
	const cid = req.params.cid;

	try {
		const cart = await cartsService.getCartByIdMdb(cid);
		res.send(cart);
	} catch (err) {
		res.status(500).send({ err });
	}
});

cartsRouter.post('/', async (req, res) => {
	const cart = req.body;
	try {
		const cartAdded = await cartsService.addCartMdb(cart);
		res.send(cartAdded);
	} catch (err) {
		res.status(500).send({ err });
	}
});

cartsRouter.post('/:cid/product/:pid', async (req, res) => {
	const cid = req.params.cid;
	const pid = req.params.pid;
	try {
		res.status(201).send(await cartsService.addProductToCartMdb(cid, pid));
	} catch (err) {
		res.status(500).send({ err });
	}
});

export default cartsRouter;
