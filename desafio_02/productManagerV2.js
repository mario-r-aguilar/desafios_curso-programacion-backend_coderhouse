const fs = require('fs');

class productManager {
	constructor(path) {
		this.path = path;
		fs.promises.writeFile(this.path, JSON.stringify([]));
	}
	#id = 0;
	// Método privado para leer archivos
	#readFile = async () => {
		const readProduct = await fs.promises.readFile(this.path, 'utf-8');
		return JSON.parse(readProduct);
	};

	// Método privado para incrementar id automáticamente
	#getId() {
		this.#id++;
		return this.#id;
	}

	// Método para mostrar lista de productos
	getProducts = async () => {
		let showProducts = await this.#readFile();
		console.log(showProducts);
	};

	/** Método para agregar un producto
	 * @param {string} title (nombre del producto)
	 * @param {string} description (descripción del producto)
	 * @param {number} price (precio del producto)
	 * @param {string} thumbnail (ruta de la imagen del producto)
	 * @param {string} code (código identificador único del producto)
	 * @param {number} stock (número de piezas disponibles del producto)
	 */

	addProduct = async (title, description, price, thumbnail, code, stock) => {
		// Valido que se hayan completado todos los campos
		if (!title || !description || !price || !thumbnail || !code || !stock) {
			console.log('Faltan datos. Por favor intente nuevamente');
			return;
		}

		let products = await this.#readFile();

		// Valido que no haya códigos duplicados
		const duplicateCode = products.find((product) => product.code === code);
		if (duplicateCode) {
			console.log('El código ya existe');
			return;
		}

		// Creo el producto
		const newProduct = {
			title,
			description,
			price,
			thumbnail,
			code,
			stock,
		};

		// Genero id automáticamente y la agrego al producto
		newProduct.id = this.#getId();

		// Agrego el producto a la lista de productos
		products.push(newProduct);

		await fs.promises.writeFile(this.path, JSON.stringify(products));
	};

	getProductById = async (id) => {
		let products = await this.#readFile();

		const findProductIndex = await products.findIndex(
			(product) => product.id === id
		);

		// Valida que el id exista y muestra un mensaje si no lo encuentra
		if (findProductIndex === -1) {
			console.log('Not found');
			return;
		}

		// Muestra el producto solicitado
		const productFound = Object.entries(products[findProductIndex]);
		console.log(`Producto Encontrado! 
        ${productFound}`);
	};

	// 	updateProduct(id, field) {}

	// 	deleteProduct(id) {}
}

// Pruebas
const productList = new productManager('./productos');

const test = async () => {
	try {
		await productList.getProducts();
		await productList.addProduct(
			'prueba',
			'prueba',
			200,
			'sin imagen',
			'CODE200',
			200
		);
		await productList.addProduct(
			'prueba2',
			'prueba2',
			300,
			'sin imagen2',
			'CODE300',
			300
		);
		await productList.getProducts();
		await productList.getProductById(2);
	} catch (error) {
		console.log('Revisar código');
	}
};

test();
