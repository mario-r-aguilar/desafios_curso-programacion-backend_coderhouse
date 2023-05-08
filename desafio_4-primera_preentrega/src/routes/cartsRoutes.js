// Importo Router
import { Router } from 'express';
// Importo administrador de carritos y sus métodos
import cartsManager from '../controllers/cartsManager.js';

const cartsRoutes = Router();
const cartsList = new cartsManager();

cartsRoutes.post('/', async (req, res) => {
	res.send(await cartsList.addCart());
});

cartsRoutes.get('/:cid', async (req, res) => {
	const cid = parseInt(req.params.cid);
	let getID = await cartsList.getCartById(cid);
	res.send(await getID);
});

cartsRoutes.post('/:cid/product/:pid', async (req, res) => {
	const cid = parseInt(req.params.cid);
	const pid = parseInt(req.params.pid);
	res.send(await cartsList.addProductToCart(cid, pid));
});

export default cartsRoutes;
