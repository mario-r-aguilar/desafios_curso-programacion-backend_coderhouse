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
			return res.send({ getProductList });
		} else {
			let productsLimit = getProductList.slice(0, limit);
			res.send({ productsLimit });
		}
	} catch (error) {
		console.log(error);
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
			res.send({ Resultado: 'ID no encontrada' });
		}
		res.send(await obtenerID);
	} catch (error) {
		console.log(error);
	}
});

// Agrego un producto
productsRoutes.post('/', async (req, res) => {
	try {
		let newProduct = req.body;
		res.send(await productList.addProduct(newProduct));
	} catch (error) {
		console.log(error);
	}
});

//Actualizo un producto
productsRoutes.put('/:pid', async (req, res) => {
	try {
		let id = req.params.pid;
		let product = req.body;
		res.send(await productList.updateProduct(id, product));
	} catch (error) {
		console.log(error);
	}
});

//Elimino un producto
productsRoutes.delete('/:pid', async (req, res) => {
	try {
		let id = req.params.pid;
		res.send(await productList.deleteProduct(id));
	} catch (error) {
		console.log(error);
	}
});

export default productsRoutes;
