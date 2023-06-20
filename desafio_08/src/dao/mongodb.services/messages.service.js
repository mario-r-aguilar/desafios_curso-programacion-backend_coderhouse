import { messageModel } from '../models/message.model.js';

class MessagesService {
	constructor() {
		this.model = messageModel;
	}

	async getAllMessages() {
		const messages = await this.model.find();
		//messages = messages.map((message) => message.toObject());
		return messages;
	}

	async addMessage({ user, message }) {
		user = 'anonymus';
		const fullMessage = { user, message };
		const newMessage = await this.model.create(fullMessage);
		return newMessage;
	}
}

export const messagesService = new MessagesService();
