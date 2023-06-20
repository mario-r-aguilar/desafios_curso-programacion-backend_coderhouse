import { Router } from 'express';
import { messagesService } from '../../dao/mongodb.services/messages.service.js';

const messagesRouter = Router();

messagesRouter.get('/api/chat/', async (req, res) => {
	try {
		const messages = await messagesService.getAllMessages();
		res.send(messages);
	} catch (err) {
		res.status(500).send({ err });
	}
});

export default messagesRouter;
