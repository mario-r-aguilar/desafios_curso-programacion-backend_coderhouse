const socket = io();

function sendMenssage() {
	const message = document.getElementById('message').value;
	socket.emit('new-message', message);
}
