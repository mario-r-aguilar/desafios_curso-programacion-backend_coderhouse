const socket = io();

const render = async (data) => {
	const html = document.getElementById('listOfProducts');
	html.innerHTML = '';
	if (data.length === 0) {
		const elementHtml = document.createElement('div');
		elementHtml.innerHTML = `<p>Aún no se han agregado productos</p>`;
		html.appendChild(elementHtml);
	} else {
		await data.forEach((element) => {
			const elementHtml = document.createElement('div');
			elementHtml.setAttribute('class', 'product');
			elementHtml.innerHTML = `<h3>Nombre del producto:</h3><p> ${
				element.title
			}</p>
<h3>Descripción del producto:</h3><p> ${element.description}</p>
<h3>Código del producto:</h3><p> ${element.code}</p>
<h3>Precio del producto:</h3><p> ${element.price}</p>
<h3>Stock del producto:</h3><p> ${element.stock}</p>
<h3>Categoría del producto</h3><p> ${element.category}</p>
<h3>Id del producto</h3><p> ${element.id}</p>
${
	element.thumbnail
		? `<h3>Imágenes del producto:</h3><p> ${element.thumbnail}</p>`
		: ''
}
`;
			html.appendChild(elementHtml);
		});
	}
};

const addProductForm = () => {
	const html = document.getElementById('form');
	html.innerHTML = '';
	const elementHtml = document.createElement('div');
	elementHtml.innerHTML = `
		<form id='addForm' method='post' action='/api/products' target="_blank">
		<input class='formItem' type='text' required id='title' name='title' placeholder='Nombre del producto' />
		<input class='formItem' type='text' required id='description' name='description' placeholder='Descripción del producto' />
		<input class='formItem' type='text' required id='code' name='code' placeholder='Código del producto' />
		<input class='formItem' type='number' required id='price' name='price' placeholder='Precio del producto' />
		<select class='formItem' required id='status' name='status' placeholder='Estado del producto' />
		<option value="true">True</option>
        <option value="false">False</option>
		</select>
		<input class='formItem' type='number' required id='stock' name='stock' placeholder='Stock del producto' />
		<input class='formItem' type='text' required id='category' name='category' placeholder='Categoría del producto' />	
		<button class='formItem' type='submit'>Enviar</button>
	</form>`;
	html.appendChild(elementHtml);
	document.getElementById('addForm');
	document.addEventListener('submit', function (event) {
		event.preventDefault();
		html.innerHTML = '';
		const response = document.createElement('div');
		response.innerHTML = `<p>Producto agregado</p>`;
		html.appendChild(response);
		document.getElementById('addForm').reset();
	});
};

const deleteProductForm = () => {
	const html = document.getElementById('form');
	html.innerHTML = '';
	const elementHtml = document.createElement('div');
	elementHtml.innerHTML = `
		<form id='deleteForm' method='post' action='/api/products/:pid'>
		<input class='formItem' type='text' required id='id' name='id' placeholder='Id del producto' />
		<button class='formItem' type='submit'>Enviar</button>
	</form>`;
	html.appendChild(elementHtml);

	document.getElementById('deleteForm');
	document.addEventListener('submit', function (event) {
		event.preventDefault();
		deleteProduct();
	});
};

const deleteProduct = () => {
	fetch('/api/products/' + pid, {
		method: 'DELETE',
	})
		.then((response) => {
			let pid = document.getElementById('id').value;
			if (pid) {
				console.log('Producto eliminado');
				const html = document.getElementById('form');
				html.innerHTML = '';
				const response = document.createElement('div');
				response.innerHTML = `<p>Producto eliminado</p>`;
				html.appendChild(response);
				document.getElementById('deleteForm').reset();
			} else {
				console.log('Error al eliminar el producto');
			}
		})
		.catch((err) => {
			console.log('Error en la solicitud:', err);
		});
};

socket.on('product_list', (data) => {
	render(data);
});
socket.on('product_list_updated', (data) => {
	render(data);
});
