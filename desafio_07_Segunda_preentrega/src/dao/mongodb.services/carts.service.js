import { cartModel } from '../models/cart.model.js';
import { productsService } from './products.service.js';

class CartsService {
	constructor() {
		this.model = cartModel;
	}

	async getCartsAll() {
		return await this.model.find();
	}

	async getCartByIdMdb(cartId) {
		return await this.model.findById(cartId);
	}

	async addCartMdb(cart) {
		return await this.model.create(cart);
	}

	async addProductToCartMdb(cartId, productId) {
		const cart = await this.model.findOne({ _id: cartId });
		const product = await productsService.getProductByIDMdb(productId);
		cart.products.push(product);
		return await cart.save();
	}

	async updateCartProductsMdb(cartId, products) {
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

	async updateProductQuantityMdb(cartId, productId, quantity) {
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

	async removeProductFromCartMdb(cartId, productId) {
		const cart = await this.model.findOne({ _id: cartId });
		cart.products = cart.products.filter(
			(product) => product._id.toString() !== productId
		);
		return await cart.save();
	}

	async deleteCartMdb(cartId) {
		return await this.model.findByIdAndDelete(cartId);
	}
}

export const cartsService = new CartsService();
