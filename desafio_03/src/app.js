// Importamos las dependencias
import express from 'express';
import productManager from './productManagerV3.js';

//Almacenamos todas las funciones de express en una constante
const app = express();

// Configuramos el servidor para que reciba datos complejos desde la url
app.use(express.urlencoded({ extended: true }));

// Utilizamos la clase productManager
const productList = new productManager('./src/productos');

// Creo un endpoint que muestra los productos almacenados en el archivo y permite limitar la cantidad de productos en pantalla
app.get('/products', async (req, res) => {
	try {
		// Leo el archivo de productos usando los métodos de la clase productManager
		const showProductList = await productList.getProducts();
		// Me aseguro que el valor del límite de resultados sea un valor numérico y no string
		let limit = parseInt(req.query.limit);
		// Si el usuario ingresa un límite de resultados lo muestro así, sino muestro la totalidad de productos
		if (!limit) {
			return res.send({ showProductList });
		} else {
			let productLimit = showProductList.slice(0, limit);
			res.send({ productLimit });
		}
	} catch (error) {
		console.log(error);
	}
});
// Creo un endpoint que muestra solo el producto solicitado por id
app.get('/products/:pid', async (req, res) => {
	try {
		// Me aseguro que el valor de la id sea un valor numérico y no string
		let id = parseInt(req.params.pid);
		// Almaceno en una variable la búsqueda a través de uno de los métodos de la clase productManager de la id ingresada
		let obtenerID = await productList.getProductById(id);
		// Valido que la id exista y muestro un mensaje de lo contrario
		if (!obtenerID) {
			res.send('ID no encontrada');
		}
		res.send(await obtenerID);
	} catch (error) {
		console.log(error);
	}
});

// Inicializo el servidor en el puerto 8080
app.listen(8080, () => {
	console.log('Listening...');
});
