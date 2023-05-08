import fs from 'fs';
import productsManager from './productsManager.js';

const listProductsToCart = new productsManager();

export default class cartsManager {
	constructor() {
		this.path = './src/models/carts.json';
	}

	//Variable privada del id de producto
	#cid = 0;
	// Método privado para leer el archivo de productos
	#readFileCarts = async () => {
		const readCart = await fs.promises.readFile(this.path, 'utf-8');
		return JSON.parse(readCart);
	};
	// Método privado para escribir el archivo de productos
	#writeFileCarts = async (carts) => {
		await fs.promises.writeFile(this.path, JSON.stringify(carts));
	};
	// Método privado para incrementar id automáticamente
	#generateIdCart() {
		this.#cid++;
		return this.#cid;
	}
	// Método privado para validar Id
	#validIdCart = async (id) => {
		let carts = await this.#readFileCarts();
		return carts.find((cart) => cart.id === id);
	};
	#validIdProduct = async (id) => {
		let products = await listProductsToCart.getProducts();
		console.log(products);
		return await products.find((product) => product.id === id);
	};

	addCart = async () => {
		const listCarts = await this.#readFileCarts();
		const cart = {
			products: [],
		};
		cart.id = this.#generateIdCart();
		listCarts.push(cart);
		await this.#writeFileCarts(listCarts);
		return listCarts;
	};

	getCartById = async (id) => {
		//Almaceno contenido del archivo de productos en una variable
		let carts = await this.#readFileCarts();
		//Busco el índice del producto solicitado por id
		let validCart = await this.#validIdCart(id);
		if (validCart === false) {
			return 'Carrito no encontrado';
		}
		// Muestro el producto solicitado
		console.log('Producto Encontrado!');
		return carts[validCart];
	};

	addProductToCart = async (cid, pid) => {
		let validCart = await this.#validIdCart(cid);
		if (validCart === false) {
			return 'Carrito no encontrado';
		}
		let validProduct = await this.#validIdProduct(pid);
		if (validProduct === false) {
			return 'Producto no encontrado';
		}

		const allCarts = await this.#readFileCarts();
		let cartFilter = await allCarts.filter((cart) => cart.id != cid);

		if (validCart.products.some((product) => product.id === pid)) {
			let productExist = validCart.products.find(
				(product) => product.id === pid
			);
			productExist.quantity++;
			let newCarts = [validCart, ...cartFilter];
			await this.#writeFileCarts(newCarts);
			return 'Producto Agregado al Carrito';
		}
		validCart.products.push({ id: validProduct.id, quantity: 1 });
		let newCarts = [validCart, ...cartFilter];
		await this.#writeFileCarts(newCarts);
		return 'Producto Agregado al Carrito';
	};
}
