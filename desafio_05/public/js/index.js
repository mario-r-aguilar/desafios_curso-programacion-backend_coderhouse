const socket = io();

const render = async (data) => {
	const html = document.getElementById('listOfProducts');
	html.innerHTML = '';
	await data.forEach((element) => {
		const elementHtml = document.createElement('div');
		elementHtml.innerHTML = ` <h2>${element.title}</h2>
    <p>${element.description}</p>
    <p>${element.code}</p>
    <p>${element.price}</p>
    <p>${element.stock}</p>
    <p>${element.category}</p>
    ${element.thumbnail ? `<p>${element.thumbnail}</p>` : ''}
    `;
		html.appendChild(elementHtml);
	});
};

socket.on('product_list', (data) => {
	render(data);
});
socket.on('product_list_updated', (data) => {
	render(data);
});
