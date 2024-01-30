import { promises as fs } from 'fs';
import { get } from 'http';
import uuid4 from 'uuid4';

class ProductManager {
	constructor() {
		this.path = "./src/models/products.json"
		this.products = []
	}

	productExists = async (id) => {
		const resp2 = await this.getProduct()
		return resp2.find(prod => prod.id == id)
	}

	writeProducts = async (products) => [
		await fs.writeFile(this.path, JSON.stringify(products, null, 2))
	]

	getProduct = async () => {
		const resp1 = await fs.readFile(this.path, 'utf-8')
		const respJSON = JSON.parse(resp1)
		return respJSON
	}

	addProduct = async (obj) => {

		const { title, description, img, code, stock, price, category, status = true } = obj

		if (!title || !description || !img || !code || !stock || !price || !category || !status) {
			return "Todos los campos son obligatorios"
		} else {
			const id = uuid4()
			const listProducts = await this.getProduct()
			const someCode = listProducts.some(p => p.code === code)
			if (!someCode) {
				const newProduct = {
					id,
					title,
					description,
					img,
					code,
					stock,
					price,
					category,
					status
				}
				this.products = await this.getProduct()
				this.products.push(newProduct)
				await this.writeProducts(this.products)
				return `Producto agregado correctamente`
			} else {
				return `El producto ya a sido agregado`
			}
		}
	}

	getProductById = async (id) => {
		const productFind = await this.productExists(id)
		return productFind ? productFind : 'Producto no encontrado';
	}

	updateProductById = async (id, { ...products }) => {
		const allProducts = await this.getProduct();
		const index = allProducts.findIndex(prod => prod.id == id)
		if (index !== -1) {
			allProducts[index] = { id, ...products }
			await this.writeProducts(allProducts)
			return allProducts[index]
		}
		return 'Producto no encontrado'
	}

	deleteProductById = async (id) => {
		const allProduct = await this.getProduct();
		const prodFilter = allProduct.filter(p => p.id !== id)
		this.writeProducts(prodFilter)
	}
}

export default ProductManager;