import mongoose from 'mongoose';
import { productModel } from './models/product.model.js';

let productsDB;
let cartsDB;
let messageDB;

switch (process.env.PERS) {
	case 'mongo':
		class ProductsService {
			constructor() {
				this.model = productModel;
			}

			async getProducts() {
				return await this.model.find();
			}

			async getProductByID(productId) {
				return await this.model.findOne({ _id: productId });
			}

			async addProduct(product) {
				return await this.model.create(product);
			}

			async updateProduct(pid, product) {
				return await this.model.updateOne({ _id: pid }, product);
			}

			async deleteProduct(productId) {
				return await this.model.deleteOne({ _id: productId });
			}
		}

		productsDB = new ProductsService();

		break;

	default:
		class ProductsService {
			constructor() {
				this.model = productModel;
			}

			async getProducts() {
				return await this.model.find();
			}

			async getProductByID(productId) {
				return await this.model.findOne({ _id: productId });
			}

			async addProduct(product) {
				return await this.model.create(product);
			}

			async updateProduct(pid, product) {
				return await this.model.updateOne({ _id: pid }, product);
			}

			async deleteProduct(productId) {
				return await this.model.deleteOne({ _id: productId });
			}
		}

		productsDB = new ProductsService();
}
