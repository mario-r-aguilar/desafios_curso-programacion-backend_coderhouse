// Creo la clase productManager
class productManager {
	// Creo la variable privada id
	#id = 0;

	constructor() {
		this.products = [];
	}

	// Método para agregar productos
	addProduct(
		title = undefined,
		description = undefined,
		price = undefined,
		thumbnail = undefined,
		code = undefined,
		stock = undefined
	) {
		// Establezco que todos los campos sean obligatorios
		if (
			title === undefined ||
			description === undefined ||
			price === undefined ||
			thumbnail === undefined ||
			code === undefined ||
			stock === undefined
		) {
			console.log('Faltan datos. Por favor intente nuevamente');
			return;
		}

		// Valido que no se repita el campo "code"
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

		// Genero id automáticamente con un método privado
		product.id = this.#getId();

		// Agrego el producto a la lista de productos
		this.products.push(product);
	}

	// Método privado para generar una id autoincrementable
	#getId() {
		this.#id++;
		return this.#id;
	}

	// Método para mostrar todos los productos creados
	getProducts() {
		return this.products;
	}

	// Método para buscar en el arreglo un producto que coincida con el id solicitado
	getProductById(productId) {
		const productIndex = this.products.findIndex(
			(product) => product.id === productId
		);

		// Valida que el id exista y muestra un mensaje si no lo encuentra
		if (productIndex === -1) {
			console.log('Not found');
			return;
		}

		// Muestra el producto de la id solicitada
		const productFound = Object.entries(this.products[productIndex]);
		console.log(`Producto Encontrado! 
        ${productFound}`);
	}
}

// Pruebas solicitadas

// Creo instancia usando la clase productManager
const listaDeProductos = new productManager();

// Muestro el listado de productos que por defecto debe estar vacío
console.log(listaDeProductos.getProducts());

// Agrego un producto
listaDeProductos.addProduct(
	'producto prueba',
	'Este es un producto prueba',
	200,
	'Sin imagen',
	'abc123',
	25
);

// Valido si se agrego el producto creado
console.log(listaDeProductos.getProducts());

// Intento agregar otro producto con el mismo código para probar si arroja el error
listaDeProductos.addProduct(
	'producto prueba',
	'Este es un producto prueba',
	200,
	'Sin imagen',
	'abc123',
	25
);

// Busco un producto inexistente para comprobar si arroja el error
listaDeProductos.getProductById(5);

// Muestro la información del producto búscado
listaDeProductos.getProductById(1);
