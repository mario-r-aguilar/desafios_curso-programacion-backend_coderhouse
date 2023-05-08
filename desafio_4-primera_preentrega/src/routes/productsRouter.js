// Importo Router
import { Router } from 'express';
// Importo administrador de productos y sus métodos
import productsManager from '../controllers/productsManager.js';

const productsRoutes = Router();
const productList = new productsManager();

// Obtengo el listado de productos
productsRoutes.get('/', async (req, res) => {
	try {
		const getProductList = await productList.getProducts();
		// Seteo el tipo de valor limit como un número
		let limit = parseInt(req.query.limit);
		// Si el usuario ingresa un límite de resultados lo muestro, sino muestro la totalidad de productos
		if (!limit) {
			return res.status(200).send({ getProductList });
		} else {
			let productsLimit = getProductList.slice(0, limit);
			res.status(200).send({ productsLimit });
		}
	} catch (err) {
		res.status(400).send({ err });
	}
});

// Obtengo un producto mediante su id
productsRoutes.get('/:pid', async (req, res) => {
	try {
		// Seteo el tipo de valor id como un número
		let id = parseInt(req.params.pid);
		// Almaceno el resultado de la búsqueda
		let obtenerID = await productList.getProductById(id);
		// Valido que la id exista y muestro un mensaje de lo contrario
		if (!obtenerID) {
			res.status(400).send({ Resultado: 'ID no encontrada' });
		}
		res.status(200).send(await obtenerID);
	} catch (err) {
		res.status(400).send({ err });
	}
});

// Agrego un producto
productsRoutes.post('/', async (req, res) => {
	try {
		let newProduct = req.body;
		res.status(201).send(await productList.addProduct(newProduct));
	} catch (err) {
		res.status(400).send({ err });
	}
});

//Actualizo un producto
productsRoutes.put('/:pid', async (req, res) => {
	try {
		let id = parseInt(req.params.pid);
		let newProduct = req.body;
		res.status(200).send(await productList.updateProduct(id, newProduct));
	} catch (err) {
		res.status(400).send({ err });
	}
});

//Elimino un producto
productsRoutes.delete('/:pid', async (req, res) => {
	try {
		let id = parseInt(req.params.pid);
		res.status(200).send(await productList.deleteProduct(id));
	} catch (err) {
		res.status(400).send({ err });
	}
});

export default productsRoutes;
