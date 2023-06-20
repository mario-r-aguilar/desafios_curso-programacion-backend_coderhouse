// Inicializamos el socket
const socket = io();

function sendMenssage() {
	// Obtengo el mensaje del input
	const message = document.getElementById('message').value;
	// Envío el mensaje al servidor
	socket.emit('new-message', message);
}

function render(data) {
	// Genero el html
	const html = data.forEach((elem) => {
		// Recorro el array de mensajes y genero el html
		`<div>
                <em>${elem}</em>
            </div>`;
	});
	// Inserto el html en el elemento con id messages
	document.getElementById('messages').innerHTML = html;
}

// Escucho el evento messages y renderizo los mensajes
socket.on('messages', (data) => {
	render(data);
});
