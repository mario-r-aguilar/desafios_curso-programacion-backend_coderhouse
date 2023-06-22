import { Server } from 'socket.io';
import express from 'express';
import http from 'http';

// usar con fs [solo habilitar si no se utiliza mongodb]
// import { listOfProducts } from './instances.js';

import { productsService } from '../dao/mongodb.services/products.service.js';
import { messagesService } from '../dao/mongodb.services/messages.service.js';

// inicializo express y server.io
export const app = express();
export const server = http.createServer(app);
export const io = new Server(server);

io.on('connection', async (socket) => {
	console.log('Cliente conectado..');

	// usar con fs [solo habilitar si no se utiliza mongodb]
	//socket.emit('product_list', await listOfProducts.getProducts());

	socket.emit('product_list', await productsService.getProducts());
	socket.emit('messages', await messagesService.getAllMessages());

	// Escucho los mensajes enviado por el cliente y se los propago a todos
	socket.on('new-message', async (message) => {
		messagesService.addMessage(message);
		// Propago el evento a todos los clientes conectados
		io.emit('messages', await messagesService.getAllMessages());

		socket.on('disconnect', () => {
			console.log('Cliente desconectado..');
		});
	});
});
