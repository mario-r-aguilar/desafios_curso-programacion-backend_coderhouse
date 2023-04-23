const fs = require('fs');

class productManager {
	constructor(path) {
		this.path = path;
		fs.promises.writeFile(this.path, JSON.stringify([]));
	}
	//Variable privada del id de producto
	#id = 0;
	// Método privado para leer los productos almacenado en el archivo
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
		//Almaceno contenido del archivo de productos en una variable
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
		// Agrego el producto a la variable de productos
		products.push(newProduct);
		//Agrego los productos al archivo de almacenamiento
		await fs.promises.writeFile(this.path, JSON.stringify(products));
	};

	/** Método para buscar un producto por id
	 * @param {number} id (Id del producto)
	 */
	getProductById = async (id) => {
		//Almaceno contenido del archivo de productos en una variable
		let products = await this.#readFile();
		//Busco el índice del producto solicitado por id
		const findProductIndex = await products.findIndex(
			(product) => product.id === id
		);
		// Valido que el id exista y muestra un mensaje si no lo encuentra
		if (findProductIndex === -1) {
			console.log('ID no encontrada');
			return;
		}
		// Muestro el producto solicitado
		const productFound = Object.entries(products[findProductIndex]);
		console.log(`Producto Encontrado! 
        ${productFound}`);
	};

	/** Método para actualizar los campos y valores de un producto
	 * @param {object} {objetoDesestructurado} (Producto a modificar)
	 */
	updateProduct = async ({ id, ...product }) => {
		//Valido que se incluyan todos los campos del producto que se ingresa
		if (
			!id ||
			!product.title ||
			!product.description ||
			!product.price ||
			!product.thumbnail ||
			!product.code ||
			!product.stock
		) {
			console.log(`Faltan campos en el producto ingresado. Recuerde que debe contar con la siguiente información: 
			title,
			description,
			price,
			thumbnail,
			code,
			stock,
			id,`);
		} else {
			//Elimino el producto a modificar
			await this.deleteProduct(id);
			//Guardo el listado de productos restantes en una variable
			let beforeProducts = await this.#readFile();
			//Genero un nuevo listado de productos con el modificado y los que no se vieron afectados
			let afterProducts = [{ ...product, id }, ...beforeProducts];
			//Agrego el nuevo listado al archivo de productos
			await fs.promises.writeFile(this.path, JSON.stringify(afterProducts));
			console.log('Producto actualizado');
		}
	};

	/** Método para eliminar un producto por id
	 * @param {number} id (Id del producto)
	 */
	deleteProduct = async (id) => {
		//Almaceno contenido del archivo de productos en una variable
		let products = await this.#readFile();
		//Busco el índice del producto solicitado por id
		const findProductIndex = await products.findIndex(
			(product) => product.id === id
		);
		// Valido que el id exista y muestra un mensaje si no lo encuentra
		if (findProductIndex === -1) {
			console.log('ID no encontrada');
			return;
		}
		//Creo un nuevo listado sin el producto eliminado
		let productFilter = products.filter((products) => products.id != id);
		//Agrego los productos al archivo de almacenamiento
		await fs.promises.writeFile(this.path, JSON.stringify(productFilter));
		console.log('Operación realizada con éxito');
	};
}

// Pruebas solicitadas
// Creo instancia
const productList = new productManager('./productos');
const test = async () => {
	try {
		// Muestro arreglo vacío
		await productList.getProducts();
		//Agrego producto
		await productList.addProduct(
			'producto prueba',
			'Este es un producto prueba',
			200,
			'Sin imagen',
			'abc123',
			25
		);
		//Muestro producto recién agregado
		await productList.getProducts();
		//Busco un producto por el ID
		await productList.getProductById(1);
		//Busco un producto inexistente para comprobar error
		await productList.getProductById(2);
		//Actualizo el campo code
		await productList.updateProduct({
			title: 'producto prueba',
			description: 'Este es un producto prueba',
			price: 200,
			thumbnail: 'Sin imagen',
			code: 'SAMSUNG-A3-NEW_PRICE',
			stock: 25,
			id: 1,
		});
		//Muestro producto actualizado
		await productList.getProducts();
		//Elimino un producto
		await productList.deleteProduct(1);
		//Intento eliminar un producto inexistente
		await productList.deleteProduct(2);
	} catch (error) {
		console.log('Revisar código');
	}
};

test();
