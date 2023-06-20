import ProductsController from '../dao/fs.controllers/productsController.js';
import CartsController from '../dao/fs.controllers/cartsController.js';

export const listOfProducts = new ProductsController();
export const listOfCarts = new CartsController();
