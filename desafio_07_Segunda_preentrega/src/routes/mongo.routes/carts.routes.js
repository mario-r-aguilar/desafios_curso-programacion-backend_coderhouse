import { Router } from 'express';
import { cartsService } from '../../dao/mongodb.services/carts.service.js';
import { productsService } from '../../dao/mongodb.services/products.service.js';

const cartsRouter = Router();

cartsRouter.get('/', async (req, res) => {
	try {
		const carts = await cartsService.getCartsAll();
		res.send(carts);
	} catch (err) {
		res.status(500).send({ err });
	}
});

cartsRouter.get('/:cid', async (req, res) => {
	const cid = req.params.cid;

	try {
		const cart = await cartsService.getCartById(cid).populate('products');
		res.send(cart);
	} catch (err) {
		res.status(500).send({ err });
	}
});

cartsRouter.post('/', async (req, res) => {
	const cart = req.body;
	try {
		const cartAdded = await cartsService.addCart(cart);
		res.send(cartAdded);
	} catch (err) {
		res.status(500).send({ err });
	}
});

cartsRouter.post('/:cid/product/:pid', async (req, res) => {
	const cid = req.params.cid;
	const pid = req.params.pid;
	try {
		const product = await productsService.getProductByID(pid);
		if (!product) {
			return res.status(404).send({ error: 'Product not found' });
		}

		const cartUpdated = await cartsService.addProductToCart(cid, product);
		res.status(201).send(cartUpdated);
	} catch (err) {
		res.status(500).send({ err });
	}
});

cartsRouter.put('/:cid', async (req, res) => {
	const cid = req.params.cid;
	const products = req.body;

	try {
		const cartUpdated = await cartsService.updateCartProducts(cid, products);
		res.send(cartUpdated);
	} catch (err) {
		res.status(500).send({ err });
	}
});

cartsRouter.put('/:cid/products/:pid', async (req, res) => {
	const cid = req.params.cid;
	const pid = req.params.pid;
	const quantity = req.body.quantity;

	try {
		const cartUpdated = await cartsService.updateProductQuantity(
			cid,
			pid,
			quantity
		);
		res.send(cartUpdated);
	} catch (err) {
		res.status(500).send({ err });
	}
});

cartsRouter.delete('/:cid/products/:pid', async (req, res) => {
	const cid = req.params.cid;
	const pid = req.params.pid;

	try {
		const cartUpdated = await cartsService.removeProductFromCart(cid, pid);
		res.send(cartUpdated);
	} catch (err) {
		res.status(500).send({ err });
	}
});

cartsRouter.delete('/:cid', async (req, res) => {
	const cid = req.params.cid;

	try {
		const cartDeleted = await cartsService.deleteCart(cid);
		res.send(cartDeleted);
	} catch (err) {
		res.status(500).send({ err });
	}
});

export default cartsRouter;
