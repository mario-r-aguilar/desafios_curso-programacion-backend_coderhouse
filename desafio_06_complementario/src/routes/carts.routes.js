import { Router } from 'express';
import { cartsService } from '../dao/carts.service.js';

const cartsRouter = Router();

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
	try {
		const cartAdded = await cartsService.addCartMdb();
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
