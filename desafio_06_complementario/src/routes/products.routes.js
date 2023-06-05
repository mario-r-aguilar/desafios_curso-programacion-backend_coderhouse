import { Router } from 'express';
import { productsService } from '../dao/products.service.js';
import { io } from '../utils/socket.js';

const productsRouter = Router();

productsRouter.get('/', async (req, res) => {
	try {
		const products = await productsService.getAllProductsMdb();
		res.send(products);
	} catch (err) {
		res.status(500).send({ err });
	}
});

productsRouter.get('/:pid', async (req, res) => {
	const pid = req.params.pid;
	try {
		const product = await productsService.getProductByIDMdb(pid);
		res.send(product);
	} catch (err) {
		res.status(500).send({ err });
	}
});

productsRouter.post('/', async (req, res) => {
	const product = req.body;
	try {
		const productAdd = await productsService.addProductMdb(product);
		res.send(productAdd);
		io.emit(
			'product_list_updated',
			await productsService.getAllProductsMdb()
		);
	} catch (err) {
		res.status(500).send({ err });
	}
});

productsRouter.put('/:pid', async (req, res) => {
	const pid = req.params.pid;
	try {
		const product = await productsService.updateProductMdb(pid, req.body);
		res.status(201).send(product);
	} catch (err) {
		res.status(500).send({ err });
	}
});

productsRouter.delete('/:pid', async (req, res) => {
	const pid = req.params.pid;
	try {
		await productsService.removeProductMdb(pid);
		res.sendStatus(204);
		io.emit(
			'product_list_updated',
			await productsService.getAllProductsMdb()
		);
	} catch (err) {
		res.status(500).send({ err });
	}
});

export default productsRouter;
