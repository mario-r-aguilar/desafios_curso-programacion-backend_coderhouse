import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
	products: [
		{
			child: new mongoose.Schema({
				product: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'products',
				},
				quantity: {
					type: Number,
					default: 1,
				},
			}),
		},
	],
});

export const cartModel = mongoose.model('carts', cartSchema);
