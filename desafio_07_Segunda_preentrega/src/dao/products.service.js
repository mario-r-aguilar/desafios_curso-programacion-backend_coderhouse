import { productModel } from './models/product.model.js';

class ProductsService {
	constructor() {
		this.model = productModel;
	}

	async getAllProductsMdb(
		limit = 10,
		page = 1,
		sort,
		category = false,
		status
	) {
		let filter = {};

		if (category) {
			filter.category = category;
		}

		if (status) {
			filter.status = status;
		}

		return await this.model.paginate(filter, {
			lean: true,
			page: page,
			limit: limit,
			sort: { price: sort },
		});
	}

	async addProductMdb(product) {
		return await this.model.create(product);
	}

	async updateProductMdb(pid, product) {
		return await this.model.updateOne({ _id: pid }, product);
	}

	async removeProductMdb(productId) {
		return this.model.deleteOne({ _id: productId });
	}

	async getProductByIDMdb(productId) {
		return await this.model.findOne({ _id: productId });
	}
}

export const productsService = new ProductsService();
