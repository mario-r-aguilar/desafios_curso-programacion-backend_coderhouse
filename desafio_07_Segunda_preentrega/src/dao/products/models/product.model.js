import mongoose from 'mongoose';

export const productSchema = new mongoose.Schema({
	title: {
		type: String,
		require: true,
	},
	description: {
		type: String,
		require: true,
	},
	code: {
		type: String,
		require: true,
		unique: true,
	},
	price: {
		type: Number,
		require: true,
	},
	status: {
		type: Boolean,
		require: false,
		default: true,
	},
	stock: {
		type: Number,
		require: true,
	},
	category: {
		type: String,
		require: true,
	},
	thumbnails: {
		type: Array,
		require: false,
	},
});

export const productModel = mongoose.model('products', productSchema);
