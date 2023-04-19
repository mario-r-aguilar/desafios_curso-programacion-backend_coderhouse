const fs = require('fs');

class productManager {
	//principio de clase
	#id = 0;

	constructor(path) {
		this.path = path;
		this.products = [];
	}

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

	/**id (se debe incrementar automáticamente, no enviarse desde el cuerpo)
title (nombre del producto)
description (descripción del producto)
price (precio)
thumbnail (ruta de imagen)
code (código identificador)
stock (número de piezas disponibles)
 */

	//Método para agregar un producto
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
