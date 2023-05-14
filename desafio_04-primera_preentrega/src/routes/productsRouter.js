// Importo Router y productsManager para utilizar sus métodos
import { Router } from 'express';
import productsManager from '../controllers/productsManager.js';

const productsRoutes = Router();
const productList = new productsManager(); // Creo instancia de productsManager

// Ruta para obtener el listado de productos
productsRoutes.get('/', async (req, res) => {
	try {
		const getProductList = await productList.getProducts();
		let limit = parseInt(req.query.limit); // Configuro el tipo de valor limit como un número
		// Si el usuario ingresa un límite de resultados lo muestro así, sino traigo la totalidad de productos
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

// Ruta para obtener un producto mediante su id
productsRoutes.get('/:pid', async (req, res) => {
	try {
		let id = req.params.pid;
		let obtenerID = await productList.getProductById(id); // Obtengo el producto
		// Valido que el producto exista y muestro un error de lo contrario
		if (!obtenerID) {
			res.status(400).send({ Resultado: 'ID no encontrada' });
		}
		res.status(200).send(await obtenerID);
	} catch (err) {
		res.status(400).send({ err });
	}
});

// Ruta para agregar un producto
productsRoutes.post('/', async (req, res) => {
	try {
		let newProduct = req.body; // Almaceno el producto que pasan por body
		res.status(201).send(await productList.addProduct(newProduct));
	} catch (err) {
		res.status(400).send({ err });
	}
});

// Ruta para actualizar un producto
productsRoutes.put('/:pid', async (req, res) => {
	try {
		let id = req.params.pid;
		let newProduct = req.body; // Almaceno el producto actualizado que pasan por body
		res.status(200).send(await productList.updateProduct(id, newProduct));
	} catch (err) {
		res.status(400).send({ err });
	}
});

// Ruta para eliminar un producto
productsRoutes.delete('/:pid', async (req, res) => {
	try {
		let id = req.params.pid;
		res.status(200).send(await productList.deleteProduct(id));
	} catch (err) {
		res.status(400).send({ err });
	}
});

export default productsRoutes;
