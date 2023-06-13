import { cartModel } from '../models/cart.model.js';
import { productsService } from './products.service.js';

class CartsService {
	constructor() {
		this.model = cartModel;
	}

	async getCartsAll() {
		return await this.model.find();
	}

	async getCartById(cartId) {
		return await this.model.findById(cartId);
	}

	async addCart(cart) {
		return await this.model.create(cart);
	}

	async addProductToCart(cartId, productId) {
		const cart = await this.model.findOne({ _id: cartId });
		const product = await productsService.getProductByID(productId);
		cart.products.push(product);
		return await cart.save();
	}

	async updateCartProducts(cartId, products) {
		try {
			const updatedCart = await this.model.findByIdAndUpdate(
				cartId,
				{ products },
				{ new: true }
			);
			return updatedCart;
		} catch (error) {
			throw new Error('Error al actualizar los productos en el carrito');
		}
	}

	async updateProductQuantity(cartId, productId, quantity) {
		const cart = await this.model.findOne({ _id: cartId });
		const productIndex = cart.products.findIndex(
			(product) => product._id.toString() === productId
		);

		if (productIndex !== -1) {
			cart.products[productIndex].quantity = quantity;
			return await cart.save();
		} else {
			throw new Error('Producto no encontrado en el carrito');
		}
	}

	async removeProductFromCart(cartId, productId) {
		const cart = await this.model.findOne({ _id: cartId });
		cart.products = cart.products.filter(
			(product) => product._id.toString() !== productId
		);
		return await cart.save();
	}

	async deleteCart(cartId) {
		return await this.model.findByIdAndDelete(cartId);
	}
}

export const cartsService = new CartsService();
