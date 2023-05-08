import fs from 'fs';

export default class productsManager {
	constructor() {
		this.path = './src/models/products.json';
	}

	//Variable privada del id de producto
	#pid = 0;
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
	#generateId() {
		this.#pid++;
		return this.#pid;
	}
	// Método privado para validar Id
	#validId = async (id) => {
		let products = await this.#readFile();
		const findProductIndex = await products.findIndex(
			(product) => product.id === id
		);
		// Valido que el id exista y muestra un mensaje si no lo encuentra
		if (findProductIndex === -1) {
			return true;
		} else {
			return false;
		}
	};

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

	// Método para agregar un producto
	addProduct = async (product) => {
		// Valido que el objeto contenga las propiedades obligatorias
		if (
			!product.title ||
			!product.description ||
			!product.code ||
			!product.price ||
			!product.status ||
			!product.stock ||
			!product.category
		) {
			return `Faltan propiedades obligatorias en el producto!
			
			title: ${product.title} 
			description: ${product.description} 
			code: ${product.code} 
			price: ${product.price} 
			status: ${product.status}
			stock: ${product.stock} 
			category: ${product.category}

			Solo la propiedad 'thumbnails' no es obligatoria. 
			Por favor intente nuevamente.
			`;
		}

		//Almaceno contenido del archivo de productos en una variable
		let productsOld = await this.#readFile();
		// Valido que no haya códigos duplicados
		let duplicateCode = productsOld.find(
			(newProduct) => newProduct.code === product.code
		);
		if (duplicateCode) {
			return 'El código ya existe';
		}
		// Genero id automáticamente y la agrego al producto
		product.id = this.#generateId();
		// Creo el producto
		const addNewProduct = [...productsOld, product];
		//Agrego los productos al archivo de almacenamiento
		this.#writeFile(addNewProduct);
		return 'Producto agregado';
	};

	/** Método para actualizar los campos y valores de un producto
	 * @param {object} object (Producto a modificar)
	 */
	updateProduct = async (id, product) => {
		// Valido si la id del producto existe
		let validProduct = await this.#validId(id);
		if (validProduct) {
			return 'Producto no encontrado';
		}
		//Elimino el producto a modificar
		await this.deleteProduct(id);
		//Guardo el listado de productos restantes en una variable
		let beforeListProducts = await this.#readFile();
		//Genero un nuevo listado de productos incluyendo el modificado
		let afterListProducts = [{ ...product, id: id }, ...beforeListProducts];
		//Agrego el nuevo listado al archivo de productos
		await this.#writeFile(afterListProducts);
		return 'Producto actualizado';
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
