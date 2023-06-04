import { cartModel } from './models/cart.model.js';
import { productsService } from './products.service.js';

class CartsService {
	constructor() {
		this.model = cartModel;
	}

	async addCartMdb() {
		return await this.model.create();
	}

	async getCartByIdMdb(cartId) {
		return await this.model.findOne(cartId);
	}

	async addProductToCartMdb(cartId, productId) {
		const cart = await this.model.findOne({ _id: cartId });
		const product = await productsService.getProductByIDMdb(productId);
		cart.products.push(product);
		return await cart.save();
	}
}

export const cartsService = new CartsService();
