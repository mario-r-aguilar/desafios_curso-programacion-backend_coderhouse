// Importo fs, nanoid (para generar id automáticamente) y la instancia de ProductsController (para utilizar sus métodos)
import fs from 'fs';
import { nanoid } from 'nanoid';
import listOfProducts from '../utils/instances.js';

export default class CartsController {
	constructor() {
		this.path = './src/models/carts.json';
	}

	// Metodos privados
	/** Lee el archivo de carritos */
	#readFileCarts = async () => {
		const readCart = await fs.promises.readFile(this.path, 'utf-8');
		return JSON.parse(readCart);
	};

	/** Escribe el archivo de carritos
	 * @param {Array} carts (Arreglo de carritos)
	 * */
	#writeFileCarts = async (carts) => {
		await fs.promises.writeFile(this.path, JSON.stringify(carts));
	};

	/** Valida que la id del carrito exista
	 * @param {number} id (Id del carrito)
	 */
	#validIdCart = async (id) => {
		let carts = await this.#readFileCarts();
		return carts.find((cart) => cart.id === id);
	};

	/** Valida que la id del producto exista
	 * @param {number} id (Id del producto)
	 */
	#validIdProduct = async (id) => {
		let products = await listOfProducts.getProducts();
		return await products.find((product) => product.id === id);
	};

	// Métodos públicos
	/** Agrega un nuevo carrito */
	addCart = async () => {
		const listCarts = await this.#readFileCarts();
		const cart = {
			products: [],
		};
		cart.id = nanoid(); // Genera id automáticamente
		listCarts.push(cart);
		await this.#writeFileCarts(listCarts);
		return listCarts; // Retorna el array de carritos incluyendo el nuevo
	};

	/** Busca carrito por id
	 * @param {number} id (Id del carrito)
	 */
	getCartById = async (id) => {
		let validCart = await this.#validIdCart(id);
		if (validCart === false) {
			return 'Carrito no encontrado';
		}
		return validCart; // Retorna el carrito indicado
	};

	/** Agrega un producto a un carrito específico
	 * @param {number} cid (Id del carrito)
	 * @param {number} pid (Id del producto)
	 */
	addProductToCart = async (cid, pid) => {
		// Valida id del carrito y del producto
		let validCart = await this.#validIdCart(cid);
		if (validCart === false) {
			return 'Carrito no encontrado';
		}
		let validProduct = await this.#validIdProduct(pid);
		if (validProduct === false) {
			return 'Producto no encontrado';
		}

		const allCarts = await this.#readFileCarts();
		// Genera un nuevo listado de carritos sin el seleccionado
		let cartFilter = await allCarts.filter((cart) => cart.id != cid);

		if (validCart.products.some((product) => product.id === pid)) {
			// Corrobora si el producto está en el carrito
			let productExist = validCart.products.find(
				(product) => product.id === pid // Si está el producto, lo busca y lo trae
			);
			productExist.quantity++; // Le suma a la propiedad quantity 1
			// Integra el nuevo array con el carrito modificado y el resto de carritos
			let newCarts = [validCart, ...cartFilter];
			await this.#writeFileCarts(newCarts);
			return 'Producto Agregado al Carrito';
		}
		// Si no está el producto lo agrega e inicializa la propiedad quantity
		validCart.products.push({ id: validProduct.id, quantity: 1 });
		let newCarts = [validCart, ...cartFilter];
		await this.#writeFileCarts(newCarts);
		return 'Producto Agregado al Carrito';
	};
}
