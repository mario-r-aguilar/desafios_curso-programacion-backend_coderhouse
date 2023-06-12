import {productsDB} from '../main.js'

const getProducts async () => {
	return await productsDB.getProducts();
  };
  
  async getProductByID(productId) {
	return await productsDB.getProductByID(productId);
  }
  
  async addProduct(product) {
	return await productsDB.addProduct(product);
  }
  
  async updateProduct(pid, product) {
	return await productsDB.updateProduct(pid, product);
  }
  
  async deleteProduct(productId) {
	return await productsDB.deleteProduct(productId);
  }
  
