import express from 'express';
import productManager from './productManagerV3.js';

const app = express();

app.use(express.urlencoded({ extended: true }));

const productList = new productManager('./src/productos');
const showProductList = productList.getProducts();

app.get('/products', async (req, res) => {
	try {
		let limit = parseInt(req.query.limit);
		if (!limit) {
			return res.send(await showProductList);
		} else {
			let allProduct = await showProductList;
			let productLimit = allProduct.slice(0, limit);
			res.send(await productLimit);
		}
	} catch (error) {
		console.log(error);
	}
});
app.get('/products/:pid'),
	async (req, res) => {
		try {
			let id = parseInt(req.params.pid);
			res.send(await productList.getProductById(id));
		} catch (error) {
			console.log(error);
		}
	};

app.listen(8080, () => {
	console.log('Listening...');
});
