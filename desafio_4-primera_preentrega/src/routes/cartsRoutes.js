// Importo Router y cartsManager para utilizar sus métodos
import { Router } from 'express';
import cartsManager from '../controllers/cartsManager.js';

const cartsRoutes = Router();
const cartsList = new cartsManager(); // Creo instancia de cartsManager

// Ruta para agregar un nuevo carrito
cartsRoutes.post('/', async (req, res) => {
	try {
		res.status(201).send(await cartsList.addCart());
	} catch (err) {
		res.status(400).send({ err });
	}
});

// Ruta para obtener un carrito por su id
cartsRoutes.get('/:cid', async (req, res) => {
	try {
		const cid = parseInt(req.params.cid); // Configuro el tipo de valor id como un número
		let getID = await cartsList.getCartById(cid);
		res.status(200).send(await getID);
	} catch (err) {
		res.status(400).send({ err });
	}
});

// Ruta para agregar un producto a un carrito existente
cartsRoutes.post('/:cid/product/:pid', async (req, res) => {
	try {
		// Configuro los tipos de valor de las id como un número
		const cid = parseInt(req.params.cid);
		const pid = parseInt(req.params.pid);
		res.status(201).send(await cartsList.addProductToCart(cid, pid));
	} catch (err) {
		res.status(400).send({ err });
	}
});

export default cartsRoutes;
