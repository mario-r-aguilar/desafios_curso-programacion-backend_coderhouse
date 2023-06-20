// Importo Router y cartsManager para utilizar sus métodos
import { Router } from 'express';
import { listOfCarts } from '../../utils/instances.js';

const cartsRoutes = Router();

// Ruta para agregar un nuevo carrito
cartsRoutes.post('/', async (req, res) => {
	try {
		res.status(201).send(await listOfCarts.addCart());
	} catch (err) {
		res.status(400).send({ err });
	}
});

// Ruta para obtener un carrito por su id
cartsRoutes.get('/:cid', async (req, res) => {
	try {
		const cid = req.params.cid;
		let getID = await listOfCarts.getCartById(cid);
		res.status(200).send(await getID);
	} catch (err) {
		res.status(400).send({ err });
	}
});

// Ruta para agregar un producto a un carrito existente
cartsRoutes.post('/:cid/product/:pid', async (req, res) => {
	try {
		const cid = req.params.cid;
		const pid = req.params.pid;
		res.status(201).send(await listOfCarts.addProductToCart(cid, pid));
	} catch (err) {
		res.status(400).send({ err });
	}
});

export default cartsRoutes;
