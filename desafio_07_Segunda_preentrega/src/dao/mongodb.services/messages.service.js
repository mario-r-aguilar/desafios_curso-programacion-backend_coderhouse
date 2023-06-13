import { messageModel } from '../models/message.model.js';
import { io } from '../../utils/socket.js';

class MessagesService {
	constructor() {
		this.model = messageModel;
	}

	async getAllMessages() {
		const listOfMessages = await this.model.find();
		io.emit('messages', listOfMessages);
		return listOfMessages;
	}

	async addMessage() {
		io.on('new-message', (newMessage) => {
			this.model.create(newMessage);
		});
		return await this.getAllMessages();
	}
}

export const messagesService = new MessagesService();
