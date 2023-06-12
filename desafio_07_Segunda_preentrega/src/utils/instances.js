import ProductsController from '../dao/productsController.js';
import CartsController from '../dao/cartsController.js';

export const listOfProducts = new ProductsController();
export const listOfCarts = new CartsController();
