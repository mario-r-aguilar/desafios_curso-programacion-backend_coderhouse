import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
	type: [
		{
			product: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'products',
			},
			quantity: {
				type: Number,
			},
		},
	],
	default: [],
});

export const cartModel = mongoose.model('carts', cartSchema);
