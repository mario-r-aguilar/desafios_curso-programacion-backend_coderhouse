// Importo fs, nanoid (para generar id automáticamente)
import fs from 'fs';
import { nanoid } from 'nanoid';

export default class productsManager {
	constructor() {
		this.path = './src/models/products.json';
	}

	// Metodos privados
	/** Lee el archivo de productos */
	#readFile = async () => {
		const readProduct = await fs.promises.readFile(this.path, 'utf-8');
		return JSON.parse(readProduct);
	};

	/** Escribe el archivo de productos */
	#writeFile = async (products) => {
		await fs.promises.writeFile(this.path, JSON.stringify(products));
	};

	/** Valida que la id del producto exista */
	#validId = async (id) => {
		let products = await this.#readFile();
		const findProductIndex = await products.findIndex(
			(product) => product.id === id
		);
		// Valido que el id exista y muestro un mensaje si no lo encuentra
		if (findProductIndex === -1) {
			return 'Producto no encontrado';
		} else {
			return findProductIndex; // Retorno el indice del producto en el array
		}
	};

	// Métodos públicos
	/** Muestra lista de productos */
	getProducts = async () => {
		let showProducts = await this.#readFile();
		return showProducts;
	};

	/** Busca un producto por id y lo muestra
	 * @param {number} id (Id del producto)
	 */
	getProductById = async (id) => {
		let products = await this.#readFile();
		const findProductIndex = await this.#validId(id); //Busco el índice del producto solicitado
		return products[findProductIndex]; // Retorno el producto solicitado
	};

	/** Agrega un producto */
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

		let productsOld = await this.#readFile();

		// Valido que no haya códigos duplicados
		let duplicateCode = productsOld.find(
			(newProduct) => newProduct.code === product.code
		);
		if (duplicateCode) {
			return 'El código ya existe';
		}

		// Genero id automáticamente y la agrego al producto
		product.id = nanoid();
		// Creo el producto
		const addNewProduct = [...productsOld, product];
		this.#writeFile(addNewProduct);
		return 'Producto agregado'; // Retorno el array de productos incluyendo el nuevo
	};

	/** Actualiza valores de un producto
	 * @param {number} id (Id del producto)
	 * @param {object} product (Producto con nuevos valores)
	 */
	updateProduct = async (id, product) => {
		await this.#validId(id); // Valido si la id del producto existe
		await this.deleteProduct(id); // Elimino del array al producto que deseo modificar
		let beforeListProducts = await this.#readFile(); // Almaceno el resto de productos
		// Genero un nuevo array de productos incluyendo el modificado
		let afterListProducts = [{ ...product, id: id }, ...beforeListProducts];
		await this.#writeFile(afterListProducts);
		return 'Producto actualizado';
	};

	/** Elimina un producto
	 * @param {number} id (Id del producto)
	 */
	deleteProduct = async (id) => {
		let products = await this.#readFile();
		//Busco el producto solicitado en el array
		const findProduct = await products.some((product) => product.id === id);
		// Si lo encuentra lo elimina y genera un nuevo array sin él. Si no lo hace, retorna un error
		if (findProduct) {
			let productFilter = products.filter((product) => product.id != id);
			this.#writeFile(productFilter);
			return 'Producto Eliminado';
		}
		return 'ID no encontrada';
	};
}
