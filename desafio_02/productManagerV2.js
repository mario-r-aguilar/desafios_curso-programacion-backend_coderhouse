const fs = require('fs');

class productManager {
	//principio de clase
	#id = 0;

	constructor(path) {
		this.path = path;
		this.products = [];
	}

	// Método privado para crear archivos
	#createFile() {
		const write = async () => {
			try {
				fs.promises.writeFile(
					`${this.path}`,
					`${JSON.stringify(this.products)}`
				);
			} catch (error) {
				console.log(error);
			}
		};
		write();
	}

	// Método privado para leer archivos
	#readFile() {
		const read = async () => {
			try {
				let reading = await fs.promises.readFile(`${this.path}`, 'utf-8');
				console.log(JSON.parse(reading));
			} catch (error) {
				console.log(error);
			}
		};
		read();
	}

	// Método privado para incrementar id automáticamente
	#getId() {
		this.#id++;
		return this.#id;
	}

	/** Método para agregar un producto
	 * @param {string} title (nombre del producto)
	 * @param {string} description (descripción del producto)
	 * @param {number} price (precio del producto)
	 * @param {string} thumbnail (ruta de la imagen del producto)
	 * @param {string} code (código identificador único del producto)
	 * @param {number} stock (número de piezas disponibles del producto)
	 */

	addProduct(title, description, price, thumbnail, code, stock) {
		//comienzo de método addProduct

		// Valido que se hayan completado todos los campos
		if (!title || !description || !price || !thumbnail || !code || !stock) {
			console.log('Faltan datos. Por favor intente nuevamente');
			return;
		}

		// Valido que no haya códigos duplicados
		const duplicateCode = this.products.find(
			(product) => product.code === code
		);
		if (duplicateCode) {
			console.log('El código ya existe');
			return;
		}

		// Creo el producto
		const product = {
			title,
			description,
			price,
			thumbnail,
			code,
			stock,
		};

		// Genero id automáticamente y la agrego al producto
		product.id = this.#getId();

		// Agrego el producto a la lista de productos
		this.products.push(product);

		this.#createFile();
		//final de método addProduct
	}

	// Método para mostrar lista de productos
	getProducts() {
		this.#readFile();
	}

	getProductById(id) {}

	updateProduct(id, field) {}

	deleteProduct(id) {}

	//final de clase
}

// Pruebas
const test = new productManager('./productos.txt');
test.addProduct('prueba', 'prueba', 200, 'sin imagen', 200, 200);
test.getProducts();
