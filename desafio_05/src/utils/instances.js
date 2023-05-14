import ProductsController from '../controllers/ProductsController.js';
import CartsController from '../controllers/CartsController.js';

export const listOfProducts = new ProductsController();
export const listOfCarts = new CartsController();
