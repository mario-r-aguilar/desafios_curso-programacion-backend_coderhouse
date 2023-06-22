// Inicializamos el socket
const socket = io();

function sendMenssage() {
	// Obtengo el mensaje del input
	const message = document.getElementById('message').value;
	// Envío el mensaje al servidor
	socket.emit('new-message', message);
}

function render(data) {
	const html = data
		.map((elem) => {
			return `${elem.user}
			${elem.message}`;
		})
		.join(' ');

	document.getElementById('messages').innerHTML = html;
}

// Escucho el evento messages y renderizo los mensajes
socket.on('messages', (data) => {
	render(data);
});
