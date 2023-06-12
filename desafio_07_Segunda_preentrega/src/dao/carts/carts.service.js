import { cartModel } from './models/cart.model.js';
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
}

export const cartsService = new CartsService();
