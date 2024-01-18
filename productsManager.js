const fs = require('fs/promises')
const uuid4 = require('uuid4')


class ProductManager {
	constructor () {
		this.path = "./products.json"
		this.products = []
	}
	addProduct = async ( title, description, img, code, stock, price, category, status ) => {
		if ( !title || !description || !img || !code || !stock || !price || !category || !status ) {
			return "Todos los campos son obligatorios"
		}

		const id = uuid4()
		if ( !this.products.some(p => p.code === code) ) {			
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
			await fs.writeFile(this.path, JSON.stringify(this.products, null, 2))
			return `Productos ${ title } agregados correctamente`
		} else {
			return `El producto con el codigo ${ code } ya a sido agregado`
		}
	}

	getProduct = async () => {
		const resp1 = await fs.readFile(this.path, 'utf-8')
		const respJSON = JSON.parse(resp1)
		return respJSON
	}

	getProductById = async (id) => {
		const resp2 = await this.getProduct()
		const productFind = resp2.find(prod => prod.id == id)
		const  log = `El producto con id:(${ id }) no existe`
		return productFind ? productFind : log;
	}

	updateProductById = async ({ id, ...products }) => {
		const listProduct = await this.getProduct();
		const index = listProduct.findIndex(prod => prod.id == id)

		if ( index !== -1 ) {
			listProduct[index] = { id, ...products }
			await fs.writeFile(this.path, JSON.stringify(listProduct, null, 2))
			console.log(listProduct[index]);
			return listProduct[index]
		} else {
			return 'Producto no encontrado'
		}
	}

	deleteProductById = async (id) => {
		const resp3 = await this.getProduct()
		const validation = resp3.some(findId => findId.id == id)
		if (validation !== true) {
			return `El producto con id:(${ id }) no existe`
		}
		const index = resp3.findIndex(prod => prod.id == id)

		if ( index !== -1 ) {
			resp3.splice(index, 1)
			await fs.writeFile(this.path, JSON.stringify(resp3, null, 2))
			const prodDelete = await this.getProduct()
			return prodDelete
		} else {
			return 'Producto no encontrado'
		}
	}
}
const instanceProducts = new ProductManager
// instanceProducts.addProduct("title1", "description1", "url", "jk7873", 10, 35, f50, true)
// instanceProducts.addProduct('title2', 'description2', 'url', 'yuNs93', 10, 25, f20, true)
// instanceProducts.addProduct('title3', 'description3', 'url', 'gt78jsx', 10, 65, f50, false)
// instanceProducts.addProduct('title4', 'description4', 'url', 'ur43kla', 10, 45, f20, true)
// instanceProducts.addProduct('title5', 'description5', 'url', 'kd59gtr', 10, 75, f50, false)
// instanceProducts.addProduct('title6', 'description6', 'url', 'js77hya', 10, 55, f50, false)
// instanceProducts.addProduct('title7', 'description7', 'url', 'ms43bjs', 10, 16, f20, true)
// instanceProducts.addProduct('title8', 'description8', 'url', 'ud193nlx', 10, 95, f20, true)
// instanceProducts.addProduct('title9', 'description9', 'url', 'oz01hfb', 10, 83, f50, false)
// instanceProducts.addProduct('title10', 'description10', 'url', 'bq32kwx', 10, 47, f20, true)
// instanceProducts.getProduct()
// instanceProducts.getProductById(3)
// instanceProducts.updateProductById()
// instanceProducts.deleteProductById(4)

module.exports = ProductManager