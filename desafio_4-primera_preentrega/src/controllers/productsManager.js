import fs from 'fs';

export default class productsManager {
	constructor() {
		this.path = './src/models/products.json';
	}

	//Variable privada del id de producto
	#id = 0;
	// Método privado para leer el archivo de productos
	#readFile = async () => {
		const readProduct = await fs.promises.readFile(this.path, 'utf-8');
		return JSON.parse(readProduct);
	};
	// Método privado para escribir el archivo de productos
	#writeFile = async (products) => {
		await fs.promises.writeFile(this.path, JSON.stringify(products));
	};
	// Método privado para incrementar id automáticamente
	#getId() {
		this.#id++;
		return this.#id;
	}
	// Método para mostrar lista de productos
	getProducts = async () => {
		let showProducts = await this.#readFile();
		return showProducts;
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
			return 'ID no encontrada';
		}
		// Muestro el producto solicitado
		console.log('Producto Encontrado!');
		return products[findProductIndex];
	};

	/** Método para agregar un producto
	 * @param {string} title (nombre del producto)
	 * @param {string} description (descripción del producto)
	 * @param {string} code (código identificador único del producto)
	 * @param {number} price (precio del producto)
	 * @param {boolean} status (estado del producto)
	 * @param {number} stock (número de piezas disponibles del producto)
	 * @param {string} category (categoría del producto)
	 * @param {Array} thumbnails (rutas de las imagenes del producto - Campo no obligatorio)
	 */
	addProduct = async (
		title,
		description,
		code,
		price,
		stock,
		category,
		thumbnails
	) => {
		// Valido que se hayan completado todos los campos

		if (!title || !description || !code || !price || !stock || !category) {
			return `Faltan datos!
			
			title: ${title} 
			description: ${description} 
			code: ${code} 
			price: ${price} 
			stock: ${stock} 
			category: ${category}

			Por favor intente nuevamente.
			`;
		}

		//Almaceno contenido del archivo de productos en una variable
		let products = await this.#readFile();
		// Valido que no haya códigos duplicados
		const duplicateCode = products.find((product) => product.code === code);
		if (duplicateCode) {
			return 'El código ya existe';
		}
		// Creo el producto
		const newProduct = {
			title,
			description,
			code,
			price,
			stock,
			category,
			thumbnails,
		};
		// Agrego la propiedad status
		newProduct.status = true;
		// Genero id automáticamente y la agrego al producto
		newProduct.id = this.#getId();
		// Agrego el producto a la variable de productos
		products.push(newProduct);
		//Agrego los productos al archivo de almacenamiento
		this.#writeFile(products);
	};

	/** Método para actualizar los campos y valores de un producto
	 * @param {object} object (Producto a modificar)
	 */
	updateProduct = async ({ id, ...product }) => {
		//Valido que se incluyan todos los campos del producto que se ingresa
		if (
			!id ||
			!product.title ||
			!product.description ||
			!product.code ||
			!product.price ||
			!product.status ||
			!product.stock ||
			!product.category ||
			!product.thumbnails
		) {
			return `Faltan campos en el producto ingresado. 
			Recuerde que debe contar con la siguiente información: 
			title,
			description,
			code,
			price,
			status, 
			stock,
			category,
			thumbnails,
			id`;
		} else {
			//Elimino el producto a modificar
			await this.deleteProduct(id);
			//Guardo el listado de productos restantes en una variable
			let beforeListProducts = await this.#readFile();
			//Genero un nuevo listado de productos con el modificado y los que no se vieron afectados
			let afterListProducts = [{ ...product, id }, ...beforeListProducts];
			//Agrego el nuevo listado al archivo de productos
			this.writeFile(afterListProducts);
			return 'Producto actualizado';
		}
	};

	/** Método para eliminar un producto por id
	 * @param {number} id (Id del producto)
	 */
	deleteProduct = async (id) => {
		//Almaceno contenido del archivo de productos en una variable
		let products = await this.#readFile();
		//Busco el producto solicitado por id en el array
		const findProduct = await products.some((product) => product.id === id);
		// Valido que el id exista y muestra un mensaje si no lo encuentra
		if (findProduct) {
			//Creo un nuevo listado sin el producto eliminado
			let productFilter = products.filter((product) => product.id != id);
			//Agrego los productos al archivo de almacenamiento
			this.#writeFile(productFilter);
			return 'Producto Eliminado';
		}
		return 'ID no encontrada';
	};
}
